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
  },

  async getCurrentUser(req, res, next) {
    try {
      const userData = {
        username: req.username,
        roleId: req.roleId
      }

      const user = await authService.getCurrentUser(userData)

      res.status(200).json({
        message: 'Current user retrieved successfully',
        data: user
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController
