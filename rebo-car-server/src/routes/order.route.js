var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const orderControllers = require('../controllers/order.controller');

router.post('/', authMiddleware.isUserLoggedIn, orderControllers.createOrder);

router.post('/addReview/:id', authMiddleware.isUserLoggedIn, orderControllers.reviewOrderById);

router.post('/filter', authMiddleware.isUserLoggedIn, orderControllers.getAllUserOrders);

router.delete('/:id', authMiddleware.isUserLoggedIn, orderControllers.deleteOrderById);

module.exports = router;
