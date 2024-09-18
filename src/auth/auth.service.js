const authRepository = require('./auth.repository')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const { validate } = require('../validation/validation')
const { ResponseError } = require('../error/response-error')
const { LoginSchema } = require('./auth.validation')

const authService = {
  async login(userData) {
    validate(LoginSchema, userData)

    const user = await authRepository.findUserByUsername(userData.username)
    if (!user) {
      throw new ResponseError(400, 'Wrong username or password')
    }

    const { username, password, email, roleId } = user

    const passwordMatch = await bcrypt.compare(userData.password, password)
    if (!passwordMatch) {
      throw new ResponseError(400, 'Wrong username or password')
    }

    const accessToken = await this.putAccessToken({ username, email, roleId })
    const refreshToken = await this.putRefreshToken({ username, email, roleId })

    await userService.updateUser(username, { refreshToken })

    return {
      accessToken,
      refreshToken
    }
  },

  async getNewAccessToken(refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error) => {
      if (error) {
        throw new ResponseError(401, 'You are unauthorized')
      }
    })

    const user = await this.getUserByRefreshToken(refreshToken)
    const { username, email, roleId } = user

    const newAccessToken = await this.putAccessToken({
      username,
      email,
      roleId
    })

    return newAccessToken
  },

  async logout(refreshToken) {
    const user = await this.getUserByRefreshToken(refreshToken)

    const updatedUser = await userService.updateUser(user.username, {
      refreshToken: ''
    })

    return updatedUser
  },

  async getUserByRefreshToken(refreshToken) {
    const user = await authRepository.findUserByRefreshToken(refreshToken)
    if (!user) {
      throw new ResponseError(404, 'User not found')
    }

    return user[0]
  },

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

module.exports = authService
