const carService = require('../services/car.service');
const { respondOK } = require('../helpers/respond.helper');

const userController = {
    addNewCar: async (req, res, next) => {
        await carService.addCar(req, res).catch((err) => {
            next(err);
        });
    },

    getAllCars: async (req, res, next) => {
        await carService
            .getAllCars(req.query)
            .then((cars) => {
                respondOK(res, { cars }, 'get list cars success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    getCarFilterWithDateTimeAndLocation: async (req, res, next) => {
        console.log('----controldfer', req.body);
        await carService
            .FindCarFilterWithDateTimeAndLocation(req.query, req.body)
            .then((cars) => {
                respondOK(res, { cars }, 'get list cars success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    findCarById: async (req, res, next) => {
        await carService
            .findCarById(req.params.id)
            .then((car) => {
                respondOK(res, { car }, 'get car success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    getAllUserCars: async (req, res, next) => {
        await carService
            .getAllUserCarsByUserId(req.params.id, req.query)
            .then((cars) => {
                respondOK(res, { cars }, 'get list cars success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    deleteCarById: async (req, res, next) => {
        await carService
            .deleteCarById(req, req.params.id)
            .then(() => {
                respondOK(res, null, 'Deleted car successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    deleteAllUserCars: async (req, res, next) => {
        await carService
            .deleteAllUserCarsById(req, req.params.id)
            .then(() => {
                respondOK(res, null, 'Deleted all user cars successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    updateCarById: async (req, res, next) => {
        console.log('body', req.body);
        await carService.updateCarById(req, res, req.params.id).catch((err) => {
            next(err);
        });
    },

    updateCarImagesById: async (req, res, next) => {
        await carService.updateCarImagesById(req, res, req.params.id).catch((err) => {
            next(err);
        });
    },

    addReviewByCarId: async (req, res, next) => {
        await carService
            .addCarReviewByCarId(req.params.id, req.body)
            .then((car) => {
                respondOK(res, { car }, 'add review to car successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    loadTotalCarStatics: async (req, res, next) => {
        console.log(req.query);
        await carService
            .loadTotalCarStatics(req.query)
            .then((cars) => {
                respondOK(res, { cars }, 'load car statics success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    findCarFilterWithRegexString: async (req, res, next) => {
        console.log(req.query);
        await carService
            .FindCarFilterWithRegexString(req.query)
            .then((data) => {
                respondOK(res, data, 'get cars success', 200);
            })
            .catch((err) => {
                next(err);
            });
    }
};

module.exports = userController;
