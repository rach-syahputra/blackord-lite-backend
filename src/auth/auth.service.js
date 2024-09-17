const userRepository = require('../user/user.repository')
const authRepository = require('./auth.repository')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authService = {
  async login(userData) {
    const user = await userRepository.findUserByUsername(userData.username)
    if (!user) {
      throw Error('User not found')
    }

    const { username, password, email, roleId } = user

    const passwordMatch = await bcrypt.compare(userData.password, password)
    if (!passwordMatch) {
      throw Error('Wrong username or password')
    }

    const accessToken = await this.putAccessToken({ username, email, roleId })
    const refreshToken = await this.putRefreshToken({ username, email, roleId })

    await userRepository.updateUserByUsername(username, { refreshToken })

    return {
      accessToken,
      refreshToken
    }
  },

  async getNewAccessToken(refreshToken) {
    const user = await this.getUserByRefreshToken(refreshToken)
    if (!user) {
      throw Error('User not found')
    }

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
    if (!user) {
      throw Error('User not found')
    }

    const updatedUser = await userRepository.updateUserByUsername(
      user.username,
      {
        refreshToken: ''
      }
    )

    return updatedUser
  },

  async getUserByRefreshToken(refreshToken) {
    const user = await authRepository.findUserByRefreshToken(refreshToken)
    if (!user) {
      throw Error('User not found')
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
