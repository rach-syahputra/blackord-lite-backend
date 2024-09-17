const jwt = require('jsonwebtoken')

const verification = {
  verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: 'Token has been expired'
        })
      }

      req.username = decoded.username
      next()
    })
  },

  async verifyArtist(req, res, next) {
    const usernameFromToken = req.username
    const username = req.params.username

    if (usernameFromToken !== username) {
      return res.status(401).json({
        message: 'You are unauthorized'
      })
    }

    next()
  }
}

module.exports = verification
