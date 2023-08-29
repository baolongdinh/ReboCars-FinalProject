const carModel = require("../models/car.model");
const userModel = require("../models/user.model");
const { respondOK, respondFailure } = require("../helpers/respond.helper");
const uploadCarImageFormData = require("../middlewares/multer/carImagesUpload");
const multer = require("multer");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");
const {
  deleteFileWithPath,
  bcryptCompareValue,
  deleteAllImagesOfCars,
  deleteAllImagesOfCar,
  cloneImagesPathOfFileToArray,
} = require("../helpers/helperFunc");
var {
  BadRequestError,
  UnAuthorizedError,
  ForbiddenError,
  NotfoundError,
} = require("../core/error.response");

//     name: {
//       type: String,
//       require: true,
//     },
// identifyNumber : String,
//     images: {
//       type: Array,
//       default: []
//     },
//     carType: String,
//     price: {
//       type: Number,
//     },
// discount: {
//   type: Number,
// },
//     description: String
//     ,
//     location: {
//       type: Schema.Types.Mixed,
//     },
//     characteristic: {
//       type: Array,
//       default: []
//     },
//     feature: {
//       type: Array,
//       default: []
//     },
//     reviews: {
//       type: Array,
//       default: []
//     },
//     vehicle_handling: Boolean
//     ,
//     bookedNumber: Number
//   },

const carSelectField = {
  // select field to get with 1 and disable with 0
};

const carService = {
  getAllCars: async ({
    limit = 10,
    sort = "ctime",
    page = 1,
    filter,
    select = carSelectField,
  }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const cars = await carModel
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(select)
      .lean();

    if (!cars) {
      throw new NotfoundError("Invalid value");
    }
    return cars;
  },

  getAllUserCarsByUserId: async (
    userId,
    { limit = 5, sort = "ctime", page = 1, select = carSelectField }
  ) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const cars = await carModel
      .find({ user_id: userId })
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(select)
      .lean();

    if (!cars) {
      throw new NotfoundError("Invalid value");
    }
    return cars;
  },

  addCar: async (req, res) => {
    uploadCarImageFormData(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return respondFailure(res, "Multer error occurred when uploading", 401);
        // A Multer error occurred when uploading.
      } else if (err) {
        return respondFailure(res, "Internal error", 500);
      }
      // Everything went fine.

      if (!req.files) {
        return respondFailure(res, "can not found file upload", 500);
      }

      const {
        name,
        identifyNumber,
        carType,
        price,
        description,
        location,
        characteristic,
        feature,
        vehicle_handling,
        user_id,
      } = req.body;

      if (!name) {
        return respondFailure(res, "invalid value", 403);
      }

      const carImagesPath = cloneImagesPathOfFileToArray(req.files);

      const newCar = await carModel.create({
        name,
        identifyNumber,
        carType,
        images: carImagesPath,
        price,
        description,
        location,
        characteristic,
        feature,
        vehicle_handling,
        user_id,
      });

      if (!newCar) {
        return respondFailure(res, "Mongoose create new car got Error", 500);
      }

      return respondOK(res, { newCar }, "user added successfully", 201);
    });
  },

  deleteCarById: async (res, id) => {
    const existedCar = await carModel.findById(id).lean();

    if (!existedCar) {
      throw new NotfoundError("Can not found car ID");
    }

    carModel
      .findByIdAndDelete(id)
      .then(() => {
        //delete all images of car
        if (existedCar.images.length > 0) {
          deleteAllImagesOfCar(existedCar);
        }
      })
      .catch((err) => {
        throw new BadRequestError("Delete car with Id got error");
      });
  },

  deleteAllUserCarsById: async (userId) => {
    const existedUser = await userModel.findById(userId).lean();

    if (!existedUser) {
      throw new NotfoundError("Can not found user ID");
    }
    const userCars = await carModel.find({ user_id: userId }).lean();

    console.log({ userCars });

    if (userCars.length <= 0) {
      throw new NotfoundError("Can not found user cars");
    }

    carModel
      .deleteMany({ user_id: userId })
      .then(() => {
        deleteAllImagesOfCars(userCars);
      })
      .catch((err) => {
        throw new BadRequestError(err.message);
      });
  },
};

module.exports = carService;
