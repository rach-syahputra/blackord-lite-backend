const jwt = require('jsonwebtoken')

const jwtService = {
  async putAccessToken(userData) {
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    })
  },

  async putRefreshToken(userData) {
    return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    })
  }
}

module.exports = jwtService
