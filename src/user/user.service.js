const bcrypt = require('bcrypt')
const userRepository = require('./user.repository')
const { AddUserSchema, UpdateUserSchema } = require('./user.validation')
const { validate } = require('../validation/validation')
const { ResponseError } = require('../error/response-error')

const userService = {
  async getAllUsers() {
    const users = await userRepository.findAllUsers()

    return users
  },

  async getUser(username) {
    const user = await userRepository.findUserByUsername(username)

    if (!user) {
      throw new ResponseError(404, 'User not found')
    }

    return user
  },

  async addUser(userData) {
    validate(AddUserSchema, userData)

    const userExists = await userRepository.findUserByUsername(
      userData.username
    )
    if (userExists) {
      throw new ResponseError(409, 'User already exists')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    userData.password = hashedPassword

    const user = await userRepository.createUser(userData)

    return user
  },

  async updateUser(username, userData) {
    validate(UpdateUserSchema, userData)

    const userExists = this.getUser(username)
    if (!userExists) {
      throw new ResponseError(404, 'User not found')
    }

    const user = await userRepository.updateUserByUsername(username, userData)

    return user
  },

  async deleteUser(username) {
    const userExists = this.getUser(username)
    if (!userExists) {
      throw new ResponseError(404, 'User not found')
    }

    await userRepository.deleteUserByUsername(username)
  }
}

module.exports = userService
