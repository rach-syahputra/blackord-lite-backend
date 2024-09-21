const authService = require('./auth.service')
const { ResponseError } = require('../../utils/error/response-error')

const authController = {
  async login(req, res, next) {
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
      next(error)
    }
  },

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken
      const accessToken = await authService.getNewAccessToken(refreshToken)

      res.status(200).json({
        message: 'Refresh token successfull',
        data: {
          accessToken
        }
      })
    } catch (error) {
      next(error)
    }
  },

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) {
        throw new ResponseError(401, 'You are unauthorized')
      }

      await authService.logout(refreshToken)

      res.clearCookie('refreshToken')
      res.status(200).json({
        message: 'User has been logged out'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController
