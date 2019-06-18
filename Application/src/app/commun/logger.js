const winston = require('winston');
const expressWinston = require('express-winston');
const { combine, timestamp, colorize, simple } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const expressLogger = expressWinston.logger({
  winstonInstance: logger,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
  colorize: true
});

module.exports = {
  logger,
  expressLogger
};
