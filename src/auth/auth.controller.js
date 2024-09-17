const jwt = require('jsonwebtoken')
const authService = require('./auth.service')

const authController = {
  async login(req, res) {
    try {
      const { accessToken, refreshToken } = await authService.login(req.body)

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: oneDayInMilliseconds
      })

      res.status(200).json({
        message: 'Login successfull',
        data: {
          accessToken
        }
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken
      const accessToken = await authService.getNewAccessToken(refreshToken)

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
          throw Error(err.message)
        }

        res.status(200).json({
          message: 'Refresh token successfull',
          data: {
            accessToken
          }
        })
      })
    } catch (error) {
      res.status(403).json({
        message: error.message || 'You are not authenticated'
      })
    }
  },

  async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken
      const user = await authService.logout(refreshToken)
      if (!user) {
        res.status(404).json({
          message: 'User not found'
        })
      }

      res.clearCookie('refreshToken')
      res.status(200).json({
        message: 'User has been logged out'
      })
    } catch (error) {
      res.status(403).json({
        message: error.message
      })
    }
  }
}

module.exports = authController
