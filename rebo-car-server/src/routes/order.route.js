var express = require('express');
var router = express.Router();

const orderControllers = require('../controllers/order.controller');

router.post('/', orderControllers.createOrder);

module.exports = router;
