var express = require('express');
var router = express.Router();
const carRouter = require('./car.route');
const userRouter = require('./user.route');
const roleRouter = require('./role.route');
const orderRouter = require('./order.route');
const discountRouter = require('./discount.route');

router.use('/cars', carRouter);
router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/orders', orderRouter);
router.use('/discounts', discountRouter);
module.exports = router;
