var express = require('express');
var router = express.Router();

const orderControllers = require('../../controllers/order.controller');

router.get('/', orderControllers.getAllOrders);
router.get('/statics', orderControllers.loadOrderStatics);
router.put('/:id', orderControllers.updateOrderById);
router.delete('/:id', orderControllers.deleteOrderById);

module.exports = router;
