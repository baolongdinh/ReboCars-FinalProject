const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const transportApi = new DailyRotateFile({
  filename: "logs/errors/%DATE%.errors.log",
  datePattern: "YYYY-MM-DD",
});

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [transportApi],
});

module.exports = logger;
