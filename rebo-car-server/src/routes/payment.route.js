var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const paymentController = require('../controllers/payment.controller');

router.post('/', authMiddleware.isUserLoggedIn, paymentController.paymentProcess);
router.get('/', authMiddleware.isUserLoggedIn, paymentController.generateBraintreeToken);
router.post('/refund', authMiddleware.isUserLoggedIn, paymentController.refundPayment);
module.exports = router;
