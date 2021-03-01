const fs = require('fs')
const winston = require('winston')
const { createLogger, format, transports } = winston;

const logger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.simple()
    ),
    transports: [
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

module.exports = {
    write(message){
        logger.info(message.substring(0 , message.lastIndexOf('\n')))
    }
}