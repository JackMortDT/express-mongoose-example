const winston = require("winston");

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ]
});

module.exports = logger;