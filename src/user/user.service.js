const userRepository = require('./user.repository')
const bcrypt = require('bcrypt')

const userService = {
  async getAllUsers() {
    const users = await userRepository.findAllUsers()

    return users
  },

  async getUser(username) {
    const user = await userRepository.findUserByUsername(username)

    if (!user) {
      throw Error('User not found')
    }

    // eslint-disable-next-line no-unused-vars
    const { password, ...other } = user

    return other
  },

  async addUser(userData) {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    userData.password = hashedPassword

    const user = await userRepository.createUser(userData)

    return user
  },

  async updateUser(username, userData) {
    const user = await userRepository.updateUserByUsername(username, userData)

    return user
  },

  async deleteUser(username) {
    await userRepository.deleteUserByUsername(username)
  }
}

module.exports = userService
