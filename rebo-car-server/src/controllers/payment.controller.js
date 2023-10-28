const { generateToken, paymentProcess, refundPayment } = require('../services/payment.service');
const { respondOK } = require('../helpers/respond.helper');
const paymentController = {
    generateBraintreeToken: (req, res, next) => {
        generateToken(req, res);
    },
    paymentProcess: (req, res, next) => {
        paymentProcess(res, req.body).catch((err) => {
            next(err);
        });
    },
    refundPayment: (req, res, next) => {
        refundPayment(req.body)
            .then((result) => {
                respondOK(res, { result }, 'refund payment successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    }
};

module.exports = paymentController;
