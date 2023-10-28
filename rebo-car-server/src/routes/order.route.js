var express = require('express');
var router = express.Router();

const orderControllers = require('../controllers/order.controller');

router.post('/', orderControllers.createOrder);

router.get('/', orderControllers.getAllUserOrders);

module.exports = router;
