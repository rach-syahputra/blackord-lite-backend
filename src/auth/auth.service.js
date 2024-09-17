const userRepository = require('../user/user.repository')
const authRepository = require('./auth.repository')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authService = {
  async login(userData) {
    const { username, email, password } = userData

    const user = await userRepository.findUserByUsername(username)
    if (!user) {
      throw Error('User not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw Error('Wrong username or password')
    }

    const accessToken = this.putAccessToken({ username, email })
    const refreshToken = this.putRefreshToken({ username, email })

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

    const { username, email } = user

    const newAccessToken = this.putAccessToken({ username, email })

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

  async putAccessToken({ username, email }) {
    return jwt.sign({ username, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    })
  },

  async putRefreshToken({ username, email }) {
    return jwt.sign({ username, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    })
  }
}

module.exports = authService
