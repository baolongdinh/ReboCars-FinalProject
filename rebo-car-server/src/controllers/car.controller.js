const carService = require("../services/car.service");
const { respondOK } = require("../helpers/respond.helper");

const userController = {
  addNewCar: async (req, res, next) => {
    await carService.addCar(req, res).catch((err) => {
      console.log("err: ", err);
      next(err);
    });
  },

  getAllCars: async (req, res, next) => {
    await carService
      .getAllCars(req.query)
      .then((cars) => {
        respondOK(res, { cars }, "get list cars success", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },

  findCarById: async (req, res, next) => {
    await carService
      .findCarById(req.params.id)
      .then((car) => {
        respondOK(res, { car }, "get car success", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },

  getAllUserCars: async (req, res, next) => {
    await carService
      .getAllUserCarsByUserId(req.params.id, req.query)
      .then((cars) => {
        respondOK(res, { cars }, "get list cars success", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },
  deleteCarById: async (req, res, next) => {
    await carService
      .deleteCarById(req, req.params.id)
      .then(() => {
        respondOK(res, null, "Deleted car successfully", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },

  deleteAllUserCars: async (req, res, next) => {
    await carService
      .deleteAllUserCarsById(req, req.params.id)
      .then(() => {
        respondOK(res, null, "Deleted all user cars successfully", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },

  updateCarById: async (req, res, next) => {
    await carService
      .updateCarById(req, req.params.id, req.body)
      .then((updateCar) => {
        respondOK(res, { updateCar }, "update car successfully", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },

  updateCarImagesById: async (req, res, next) => {
    await carService
      .updateCarImagesById(req, res, req.params.id)
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },
};

module.exports = userController;
