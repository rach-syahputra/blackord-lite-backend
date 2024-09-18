const jwt = require('jsonwebtoken')
const { ResponseError } = require('../error/response-error')

const verification = {
  verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
      throw new ResponseError(401, 'You are unauthorized')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new ResponseError(403, 'Token has been expired')
      }

      req.username = decoded.username
      next()
    })
  }
}

module.exports = verification
