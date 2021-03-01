const fs = require('fs')
const winston = require('winston')
const { createLogger, format, transports } = winston;

const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.simple()
    ),
    transports: [
      new winston.transports.File({ filename: 'log/info.log' , level : "info"}),
      new winston.transports.File({ filename: 'log/warn.log' , level : "warn"}),
      new winston.transports.File({ filename: 'log/error.log' , level : "error"}),
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.simple()
        )
      }),
      new transports.Stream({
        stream: fs.createWriteStream('log/LogStream.log')
      })
    ]
})

module.exports = logger