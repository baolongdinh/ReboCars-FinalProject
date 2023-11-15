var { sendEmailToVerifyAccount, sendEmailOrderConfirm } = require('../services/email.service');

//var { generateToken, paymentProcess, refundPayment } = require('../services/payment.service');

// sendEmailToVerifyAccount('rebocars3@gmail.com', 'ReboCars - Verify your email', {
//     name: 'Bao Long',
//     verifyEmailUrl: 'http://localhost:3000/api/cars?page=1&limit=5'
// }).catch((err) => console.log(err));

const order = {
    price: 200,
    discountPrice: 150
};

sendEmailOrderConfirm('user11112@gmail.com', 'ReboCars - Thông báo đặt thuê xe thành công', {
    order
}).catch((err) => console.log(err));

//generateToken();

// paymentProcess({ amountTotal: '25.000', paymentMethod: 'nonce-from-the-client' });

//refundPayment('903dpeqb', '13.00');
