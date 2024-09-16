const {
  updateUserByUsername,
  findUserByUsername
} = require('../user/user.repository')
const { findUserByRefreshToken } = require('./auth.repository')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (userData) => {
  const { username, email, password } = userData

  const user = await findUserByUsername(username)
  if (!user) {
    throw Error('User not found')
  }

  const correctPassword = await bcrypt.compare(password, user.password)
  if (!correctPassword) {
    throw Error('Wrong username or password')
  }

  const accessToken = putAccessToken({ username, email })
  const refreshToken = putRefreshToken({ username, email })

  await updateUserByUsername(username, { refreshToken })

  return {
    accessToken,
    refreshToken
  }
}

const getNewAccessToken = async (refreshToken) => {
  const user = await getUserByRefreshToken(refreshToken)
  if (!user) {
    throw Error('User not found')
  }

  const { username, email } = user

  const newAccessToken = putAccessToken({ username, email })

  return newAccessToken
}

const logout = async (refreshToken) => {
  const user = await getUserByRefreshToken(refreshToken)
  if (!user) {
    throw Error('User not found')
  }

  const updatedUser = await updateUserByUsername(user.username, {
    refreshToken: ''
  })

  return updatedUser
}

const getUserByRefreshToken = async (refreshToken) => {
  const user = await findUserByRefreshToken(refreshToken)
  if (!user) {
    throw Error('User not found')
  }

  return user[0]
}

const putAccessToken = ({ username, email }) => {
  return jwt.sign({ username, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h'
  })
}

const putRefreshToken = ({ username, email }) => {
  return jwt.sign({ username, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d'
  })
}

module.exports = {
  login,
  getNewAccessToken,
  logout,
  getUserByRefreshToken,
  putAccessToken,
  putRefreshToken
}
