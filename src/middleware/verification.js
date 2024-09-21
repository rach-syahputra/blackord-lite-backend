const jwt = require('jsonwebtoken')
const { ResponseError } = require('../utils/error/response-error')

const verification = {
  verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
      throw new ResponseError(403, 'You are unauthenticated')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        throw new ResponseError(403, 'Token has been expired')
      }

      req.username = decoded.username
      next()
    })
  }
}

module.exports = verification
