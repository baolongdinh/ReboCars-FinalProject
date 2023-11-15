var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');
const { OAuth2Client } = require('google-auth-library');
const ADMIN_EMAIL_ADDRESS = 'highskikes11@gmail.com';
var dotenvPath = path.join(__dirname, '..', '..', '.env');
require('dotenv').config({ path: dotenvPath });
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');
const { respondOK } = require('../helpers/respond.helper');

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
});

const sendEmailToVerifyAccount = async (email, subject, contentReplacements) => {
    const htmlTemplatePath = path.join(__dirname, '..', 'assets', 'html', 'emailVerifyAccount.html');
    readHTMLFile(htmlTemplatePath, async (err, html) => {
        if (err) {
            throw new BadRequestError(err.message);
        }

        var template = handlebars.compile(html);

        var htmlToSend = template(contentReplacements);

        /**
         * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
         * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
         */
        const myAccessTokenObject = await myOAuth2Client.getAccessToken().catch((err) => console.log(err));
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token;

        console.log({ myAccessToken });

        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        });

        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
            to: email, // Gửi đến ai?
            subject: subject, // Tiêu đề email
            html: htmlToSend
        };

        // Gọi hành động gửi email
        transport.sendMail(mailOptions, (err, respond) => {
            if (err) {
                throw new BadRequestError(err.message);
            }
            // Không có lỗi gì thì trả về success
            console.log('send email successfully');
        });
    });
};

const sendEmailOrderConfirm = async (email, subject, contentReplacements) => {
    var htmlTemplatePath = path.join(__dirname, '..', 'assets', 'html', 'emailOrderConfirm.html');
    readHTMLFile(htmlTemplatePath, async (err, html) => {
        if (err) {
            throw new BadRequestError(err.message);
        }

        var template = handlebars.compile(html);

        var htmlToSend = template(contentReplacements);

        /**
         * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
         * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
         */
        const myAccessTokenObject = await myOAuth2Client.getAccessToken().catch((err) => console.log(err));
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token;

        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            }
        });

        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
            to: email, // Gửi đến ai?
            subject: subject, // Tiêu đề email
            html: htmlToSend
        };

        // Gọi hành động gửi email
        transport.sendMail(mailOptions, (err, respond) => {
            if (err) {
                throw new BadRequestError(err.message);
            }
            // Không có lỗi gì thì trả về success
            console.log('send email successfully');
        });
    });
};

module.exports = { sendEmailToVerifyAccount, sendEmailOrderConfirm };
