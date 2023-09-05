const errorLogger = require("../middlewares/loggerHandler");
const { sendAlertToSlack } = require("../helpers/sendSlackMessage");
const respondOK = (res, data, msg, statusCode) => {
  return res.status(statusCode).json({
    success: true,
    message: msg,
    metadata: data,
  });
};

const respondFailure = (res, msg, statusCode) => {
  var error = {
    name: "Error",
    message: msg,
    statusCode,
  };
  sendAlertToSlack(error);
  errorLogger.error(`statusCode: ${statusCode} -- error.message: ${msg}`);
  return res.status(statusCode).json({
    success: false,
    message: msg,
  });
};

module.exports = { respondOK, respondFailure };
