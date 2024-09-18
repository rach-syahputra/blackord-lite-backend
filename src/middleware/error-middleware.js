const { ZodError } = require('zod')
const ResponseError = require('../error/response-error')

// temporarily this error middleware handler isn't called anywhere
// instead the error middleware is coded directly within index.js
function errorMiddleware(error, req, res, next) {
  if (!error) {
    next()
    return
  }

  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message
    })
  } else if (error instanceof ZodError) {
    res.status(400).json({
      errors: error.issues[0].message
    })
  } else {
    res.status(500).json({
      error: error.message
    })
  }
}

module.exports = errorMiddleware
