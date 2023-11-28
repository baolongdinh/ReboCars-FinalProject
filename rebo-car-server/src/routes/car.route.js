var express = require('express');
var router = express.Router();
const carController = require('../controllers/car.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const defineEndpoint = (req, res, next) => {
    req.endpoint = 'userCars';
    next();
};

router.get('/search', carController.findCarFilterWithRegexString);

router.get('/', carController.getAllCars);

router.post('/find/filter', carController.getCarFilterWithDateTimeAndLocation);

router.get('/:id', carController.findCarById);

//Logged In require
router.post(
    '/',
    defineEndpoint,
    // authMiddleware.isUserLoggedIn,
    carController.addNewCar
);

router.get('/userCars/:id', defineEndpoint, authMiddleware.isUserLoggedIn, carController.getAllUserCars);

router.delete(
    '/userCars/:id',
    defineEndpoint,
    authMiddleware.isUserLoggedIn,
    carController.deleteAllUserCars
);

router.put('/userCars/:id', defineEndpoint, authMiddleware.isUserLoggedIn, carController.updateCarById);

router.put('/activeOrBlock/:id', defineEndpoint, carController.activeOrBlockCarById);

router.patch(
    '/carImages/:id',
    defineEndpoint,
    authMiddleware.isUserLoggedIn,
    carController.updateCarImagesById
);

router.patch('/review/:id', carController.addReviewByCarId);

/* ADMIN PERMISSIONS */

module.exports = router;
