const morgan = require('morgan')
const logger = require('./logger')
const misc = require('./misc')

const morganMiddleware = (request, response, next) => {
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
  misc.morganToken()
  next()
}

// Unknown Endpoint Handler Middleware
const unknownHandlerMiddleware = (request, response) => response.status(404).send({
  error : 'Unknown Endpoint'
})

// Error Handler Middleware
const errorHandlerMiddleware = (error, request, response, next) => {
  logger.error(error)
  if (error.name === 'CastError'){
    response.status(400).send({
      error : 'Malformatted ID'
    })
  }
  else if (error.name === 'ValidationError'){
    response.status(400).send(error.message)
  }
  else{
    response.send(500).end()
  }
  next(error)
}

module.exports = {
  morganMiddleware,
  unknownHandlerMiddleware,
  errorHandlerMiddleware
}