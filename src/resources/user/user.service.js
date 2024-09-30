const bcrypt = require('bcrypt')
const userRepository = require('./user.repository')
const { AddUserSchema, UpdateUserSchema } = require('./user.validation')
const { validate } = require('../../utils/validation/validation')
const { ResponseError } = require('../../utils/error/response-error')

const userService = {
  async getAll() {
    const users = await userRepository.findAll()

    return users
  },

  async get(username) {
    const user = await userRepository.find(username)

    if (!user) throw new ResponseError(404, 'User not found')

    return user
  },

  async add(userData) {
    validate(AddUserSchema, userData)

    const userExists = await userRepository.find(userData.username)
    if (userExists) throw new ResponseError(409, 'User already exists')

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    userData.password = hashedPassword

    const user = await userRepository.create(userData)

    return user
  },

  async update(username, userData) {
    validate(UpdateUserSchema, userData)

    await this.get(username)

    const user = await userRepository.update(username, userData)

    return user
  },

  async delete(username) {
    const userExists = this.get(username)
    if (!userExists) throw new ResponseError(404, 'User not found')

    await userRepository.delete(username)
  }
}

module.exports = userService
