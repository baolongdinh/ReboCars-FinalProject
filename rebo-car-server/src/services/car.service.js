const carModel = require('../models/car.model');
const userModel = require('../models/user.model');
const { respondOK, respondFailure } = require('../helpers/respond.helper');
const uploadCarImageFormData = require('../middlewares/multer/carImagesUpload');
const multer = require('multer');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const { buildCarMatchFilterCondition } = require('../helpers/mongo.helper');
const {
    deleteFileWithPath,
    bcryptCompareValue,
    deleteAllImagesOfCars,
    deleteAllImagesOfCar,
    cloneImagesPathOfFileToArray,
    checkUserPermission
} = require('../helpers/helperFunc');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');

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
    __v: 0
};

const carService = {
    getAllCars: async ({
        limit = 12,
        sort = {
            createdAt: -1,
            discount: -1,
            price: 1,
            reviewRateAvg: -1
        },
        page = 1,
        filter,
        select = carSelectField
    }) => {
        const skip = (page - 1) * parseInt(limit);

        if (!filter) {
            filter = {};
        } else {
            filter = JSON.parse(filter);
        }

        console.log({ filter });

        const cars = await carModel.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).select(select);

        if (!cars) {
            throw new NotfoundError('Invalid value');
        }
        return cars;
    },

    FindCarFilterWithDateTimeAndLocation: async (
        { limit = 6, page = 1, select = carSelectField },
        {
            startDateTime,
            endDateTime,
            location,
            sort = {
                discount: -1,
                price: 1,
                reviewRateAvg: -1
            },
            filter,
            features = [],
            fuel
        }
    ) => {
        try {
            console.log(filter, features, fuel);
            const skip = (page - 1) * parseInt(limit);

            startDateTime = new Date('2023/09/19');
            endDateTime = new Date('2023/09/21');

            const cars = await carModel.aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        localField: '_id',
                        foreignField: 'car_id',
                        pipeline: [
                            {
                                $match: {
                                    end_date_time: {
                                        $gte: new Date()
                                    }
                                }
                            },
                            {
                                $project: {
                                    start_date_time: 1,
                                    end_date_time: 1
                                }
                            }
                        ],
                        as: 'orders'
                    }
                },
                {
                    $addFields: {
                        reviewRateAvg: {
                            $avg: '$reviews.rate'
                        },
                        discountPrice: {
                            $subtract: [
                                '$price',
                                {
                                    $divide: [
                                        {
                                            $multiply: ['$price', '$discount']
                                        },
                                        100
                                    ]
                                }
                            ]
                        }
                    }
                },
                {
                    $match: {
                        $or: [
                            // filter date range
                            {
                                orders: []
                            },
                            {
                                'orders.start_date_time': {
                                    $gt: endDateTime
                                }
                            },
                            {
                                'orders.end_date_time': {
                                    $lt: startDateTime
                                }
                            }
                        ],
                        $and: buildCarMatchFilterCondition(filter, features, fuel, location)
                    }
                },
                { $project: select },
                { $sort: sort },
                { $skip: skip },
                { $limit: parseInt(limit) }
            ]);

            if (!cars) {
                throw new NotfoundError('Invalid value');
            }
            return cars;
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },
    FindCarFilterWithRegexString: async ({
        limit = 6,
        page = 1,
        matchString = '',
        sort = {
            createdAt: -1
        },
        select = carSelectField
    }) => {
        try {
            console.log({ matchString });

            const skip = (page - 1) * parseInt(limit);
            const cars = await carModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'car_owner'
                    }
                },
                {
                    $match: {
                        $or: [
                            { name: { $regex: matchString, $options: 'i' } },
                            { identifyNumber: { $regex: matchString, $options: 'i' } }
                        ]
                    }
                },
                { $project: select },
                { $sort: sort },
                { $skip: skip },
                { $limit: parseInt(limit) }
            ]);

            if (!cars) {
                throw new NotfoundError('Invalid value');
            }

            const totalCars = await carModel.countDocuments();

            const data = {
                totalCars,
                cars
            };

            return data;
        } catch (error) {
            throw new InternalServerError(error.message);
        }
    },

    findCarById: async (carId) => {
        const cars = await carModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(carId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'carOwner'
                }
            },
            {
                $addFields: {
                    reviewRateAvg: {
                        $avg: '$reviews.rate'
                    }
                }
            }
        ]);

        if (!cars[0]) {
            throw new NotfoundError('can not found car Id');
        }
        console.log(cars[0]);
        return cars[0];
    },

    getAllUserCarsByUserId: async (
        userId,
        { limit = 5, sort = 'ctime', page = 1, select = carSelectField }
    ) => {
        const skip = (page - 1) * limit;
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
        const cars = await carModel
            .find({ user_id: userId })
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(select)
            .lean();

        if (!cars) {
            throw new NotfoundError('Invalid value');
        }
        return cars;
    },

    addCar: async (req, res) => {
        uploadCarImageFormData(req, res, async function (err) {
            console.log(req.body, req.files);
            try {
                if (err instanceof multer.MulterError) {
                    return respondFailure(res, 'Multer error occurred when uploading', 401);
                    // A Multer error occurred when uploading.
                } else if (err) {
                    return respondFailure(res, 'Internal error', 500);
                }
                // Everything went fine.

                if (!req.files) {
                    return respondFailure(res, 'can not found file upload', 500);
                }

                let {
                    name,
                    identifyNumber,
                    carType,
                    price,
                    description,
                    location,
                    discount,
                    characteristics,
                    features,
                    vehicle_handling,
                    user_id,
                    car_delivery,
                    max_distance_delivery,
                    delivery_price_1km,
                    max_delivery_free_price,
                    max_distance_per_day,
                    over_distance_per_km_price,
                    max_km_per_day
                } = req.body;

                if (!name) {
                    return respondFailure(res, 'invalid value', 403);
                }

                // -------------------------- //
                features = features.split(',');
                location = JSON.parse(location);
                characteristics = JSON.parse(characteristics);
                //----------------------------- //

                const carImagesPath = cloneImagesPathOfFileToArray(req.files);

                const newCar = await carModel.create({
                    name,
                    identifyNumber,
                    carType,
                    images: carImagesPath,
                    price,
                    description,
                    location,
                    discount,
                    characteristics,
                    features,
                    vehicle_handling,
                    user_id,
                    car_delivery,
                    max_distance_delivery,
                    delivery_price_1km,
                    max_delivery_free_price,
                    max_distance_per_day,
                    over_distance_per_km_price,
                    max_km_per_day
                });

                if (!newCar) {
                    return respondFailure(res, 'Mongoose create new car got Error', 500);
                }

                return respondOK(res, { newCar }, 'user added successfully', 201);
            } catch (error) {
                console.log(error);
                return respondFailure(res, error.message, 500);
            }
        });
    },

    deleteCarById: async (req, id) => {
        const existedCar = await carModel.findById(id).lean();

        if (!existedCar) {
            throw new NotfoundError('Can not found car ID');
        }

        if (
            !checkUserPermission(req.user.role, req.endpoint, req.method) && // check permissions of user own car or role permission to delete car
            existedCar.user_id !== req.user.id
        ) {
            throw new UnAuthorizedError('permission denied');
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
                throw new BadRequestError('Delete car with Id got error');
            });
    },

    deleteAllUserCarsById: async (req, userId) => {
        const existedUser = await userModel.findById(userId).lean();

        if (!existedUser) {
            throw new NotfoundError('Can not found user ID');
        }

        if (
            !checkUserPermission(req.user.role, req.endpoint, req.method) && // check permissions of user own car or role permission to delete car
            existedUser._id !== req.user.id
        ) {
            throw new UnAuthorizedError('permission denied');
        }

        const userCars = await carModel.find({ user_id: userId }).lean();

        console.log({ userCars });

        if (userCars.length <= 0) {
            throw new NotfoundError('Can not found user cars');
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

    updateCarById: async (req, res, carId) => {
        try {
            let {
                features,
                price,
                location,
                discount,
                description,
                car_delivery,
                max_km_per_day,
                max_distance_delivery,
                delivery_price_1km,
                freeDeliverDistanceValue,
                max_distance_per_day,
                over_distance_per_km_price,
                max_delivery_free_price
            } = req.body;

            console.log(req.body);

            const existedCar = await carModel.findById(carId);

            if (!existedCar) {
                return respondFailure(res, 'can not find car id', 403);
            }

            if (req.user.id !== existedCar.user_id.toString()) {
                // check Is Car Owner ?
                return respondFailure(res, 'permission denied', 401);
            }
            // -------------------------- //
            // features = features.split(',');
            location = JSON.parse(location);
            // -------------------------- //

            const updatedCar = await carModel
                .findByIdAndUpdate(
                    carId,
                    {
                        features,
                        price,
                        location,
                        discount,
                        description,
                        car_delivery,
                        max_km_per_day,
                        max_distance_delivery,
                        delivery_price_1km,
                        freeDeliverDistanceValue,
                        max_distance_per_day,
                        over_distance_per_km_price,
                        max_delivery_free_price
                    },
                    {
                        new: true
                    }
                )
                .catch((err) => {
                    console.log({ err });
                });
            console.log({ updatedCar });

            respondOK(res, { updatedCar }, 'updated car successfully', 200);
        } catch (error) {
            console.error(error);
            return respondFailure(res, error.message, 400);
        }
    },

    updateCarImagesById: async (req, res, carId) => {
        uploadCarImageFormData(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return respondFailure(res, 'Multer error occurred when uploading', 401);
                // A Multer error occurred when uploading.
            } else if (err) {
                return respondFailure(res, 'Internal error', 500);
            }
            // Everything went fine.

            try {
                console.log(carId);
                if (!req.files) {
                    return respondFailure(res, 'can not found file upload', 500);
                }
                console.log(req.files);
                const existCar = await carModel.findById(carId).lean();

                if (!existCar) {
                    return respondFailure(res, 'can not found car with id', 403);
                }

                if (req.user.id !== existCar.user_id.toString()) {
                    // check Is Car Owner ?
                    return respondFailure(res, 'permission denied', 401);
                }

                deleteAllImagesOfCar(existCar);

                const carImagesPath = cloneImagesPathOfFileToArray(req.files);

                const updateImagesCar = await carModel
                    .findByIdAndUpdate(
                        carId,
                        {
                            images: carImagesPath
                        },
                        {
                            new: true
                        }
                    )
                    .catch((err) => {
                        return respondFailure(res, 'updated error', 400);
                    });

                respondOK(res, { updateImagesCar }, 'updated car images successfully', 200);
            } catch (error) {
                console.error(error.message);
                return respondFailure(res, error.message, 400);
            }
        });
    },
    activeOrBlockCarById: async (carId) => {
        try {
            console.log(carId);

            const existCar = await carModel.findById(carId);

            if (!existCar) {
                return respondFailure(res, 'can not found car with id', 403);
            }
            existCar.status = !existCar.status;
            await existCar.save();
            return existCar;
        } catch (error) {
            console.error(error.message);
            return respondFailure(res, error.message, 400);
        }
    },

    addCarReviewByCarId: async (carId, review) => {
        console.log(review, carId);
        const car = await carModel
            .findByIdAndUpdate(
                carId,
                {
                    $push: {
                        reviews: review
                    }
                },
                {
                    new: true
                }
            )
            .catch((err) => {
                throw new BadRequestError(err.message);
            });

        console.log({ car });
        return car;
    },
    loadTotalCarStatics: async ({ filter }) => {
        try {
            var groupStage = {
                year: '$year'
            };

            if (filter === 'month') {
                groupStage = { ...groupStage, month: '$month' };
            }

            const cars = await carModel.aggregate([
                {
                    $project: {
                        month: { $month: '$createdAt' }, // Extract the month from the createdAt field
                        year: { $year: '$createdAt' } // Extract the year if needed
                        // Add other fields you want to include in the result
                    }
                },
                {
                    $group: {
                        _id: groupStage,
                        totalCars: { $sum: 1 } // Count the number of orders
                        // Add other fields you want to include in the result
                    }
                },
                {
                    $sort: {
                        '_id.year': 1, // Sort by year in ascending order
                        '_id.month': 1 // Sort by month in ascending order
                    }
                }
            ]);

            return cars;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};

module.exports = carService;
