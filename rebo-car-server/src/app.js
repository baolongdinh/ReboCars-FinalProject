var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var database = require('./database.init');
var routers = require('./routes');
var errorLogger = require('./middlewares/loggerHandler');
var { sendAlertToSlack } = require('./helpers/sendSlackMessage');
var app = express();

require('dotenv').config();
app.use(cors());
database.createDatabase();

app.use(logger('dev'));

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use('/api', routers);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (error, req, res, next) {
    console.error(error);
    const apiUrl = `${req.method} - ${req.url}`;
    sendAlertToSlack(error, apiUrl);

    const d_t = new Date();

    let hour = d_t.getHours();
    let minute = d_t.getMinutes();
    let seconds = d_t.getSeconds();

    const time = `${hour}:${minute}:${seconds}`;
    //logging errors
    errorLogger.error(`Time: ${time} -- ${apiUrl} -- statusCode: ${error.status || 500} -- error.message: ${error.message}`);

    error.status = error.status || 500;
    res.status(error.status).json({
        success: 'Fail',
        statusCode: error.status,
        message: error.message
    });
});

module.exports = app;
