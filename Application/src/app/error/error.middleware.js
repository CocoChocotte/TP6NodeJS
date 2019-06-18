const { AppErrorTypes } = require('./error');
const { logger } = require('../commun/logger');


const errorMiddleware = (error, req, res, next) => {
  let logMessage, errorType;
  if (error && error.type) {
    logMessage = error.stack;
    errorType = error.type;
  } else if (error instanceof Error) {
    logMessage = error.stack;
    errorType = AppErrorTypes.OTHER_ERROR;
  } else {
    logMessage = error instanceof Object ? JSON.stringify(error) : error;
    errorType = AppErrorTypes.OTHER_ERROR;
  }
  logger.error(logMessage, {url: req.originalUrl});
  res.sendStatus(errorType.httpCode);
};

module.exports = errorMiddleware;
