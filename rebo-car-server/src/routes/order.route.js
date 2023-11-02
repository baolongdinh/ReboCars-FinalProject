var express = require('express');
var router = express.Router();

const orderControllers = require('../controllers/order.controller');

router.post('/', orderControllers.createOrder);

router.post('/addReview/:id', orderControllers.reviewOrderById);

router.post('/filter', orderControllers.getAllUserOrders);

router.delete('/:id', orderControllers.deleteOrderById);

module.exports = router;
