var express = require('express');
var router = express.Router();
var userRouter = require('./user.route.js');
var carRouter = require('./car.route.js');
var authRouter = require('./auth.route.js');
var adminRouter = require('./admin');
var discountRouter = require('./discount.route.js');
var orderRouter = require('./order.route.js');

router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/cars', carRouter);
router.use('/auth', authRouter);
router.use('/discounts', discountRouter);
router.use('/orders', orderRouter);

module.exports = router;
