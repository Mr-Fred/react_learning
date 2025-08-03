const morgan = require('morgan');
const winston = require('winston');

const { combine, timestamp, printf, colorize } = winston.format;

// Define different log levels. Winston has them by default.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This is the format of the log message
const logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  colorize(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create the logger instance
const logger = winston.createLogger({
  levels,
  format: logFormat,
  transports: [new winston.transports.Console()],
});

// Create a stream object with a 'write' function that will be used by `morgan`
const stream = {
  write: (message) => {
    // Use the 'http' log level so the output will be picked up by the logger
    logger.http(message.trim());
  },
};

// Morgan middleware to log HTTP requests
const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

// Export the request logger middleware and the logger's methods
module.exports = {
  requestLogger,
  error: (...args) => logger.error(...args),
  warn: (...args) => logger.warn(...args),
  info: (...args) => logger.info(...args),
  http: (...args) => logger.http(...args),
  debug: (...args) => logger.debug(...args),
};
