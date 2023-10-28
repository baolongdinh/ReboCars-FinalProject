var braintree = require('braintree');
const { respondOK, respondFailure } = require('../helpers/respond.helper');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');
require('dotenv').config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

async function generateToken(req, res) {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            return res.status(400).json(err);
        }
        return res.status(200).json(response);
    });
}

async function paymentProcess(res, { amountTotal, paymentMethod }) {
    gateway.transaction.sale(
        {
            amount: amountTotal,
            paymentMethodNonce: paymentMethod,
            options: {
                submitForSettlement: true
            }
        },
        (err, result) => {
            if (err) {
                throw new BadRequestError(err.message);
            }

            console.log('Transaction ID: ' + result.transaction.id);
            return respondOK(res, result.transaction.id, 'payment successfully', 200);
        }
    );
}

async function refundPayment(transactionId, amount) {
    gateway.transaction.refund(transactionId, amount, (err, result) => {
        if (err) {
            throw new BadRequestError(err.message);
        }

        return result;
    });
}

module.exports = { generateToken, paymentProcess, refundPayment };
