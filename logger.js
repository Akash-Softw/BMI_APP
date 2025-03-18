const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // Adds a timestamp
    winston.format.json() // Logs in JSON format
  ),
  transports: [
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// If in development, also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
