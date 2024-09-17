const userService = require('./user.service')

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers()

      res.status(200).json({
        message: 'Users successfully retrieved',
        data: users
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async getUser(req, res) {
    try {
      const username = req.params.username
      const user = await userService.getUser(username)

      res.status(200).json({
        message: 'User successfully retrieved',
        data: user
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async addUser(req, res) {
    try {
      const userData = req.body

      const user = await userService.addUser(userData)

      res.status(201).json({
        message: 'User added successfully',
        data: user
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async updateUser(req, res) {
    try {
      const username = req.params.username
      const userData = req.body

      const user = await userService.updateUser(username, userData)

      res.status(200).json({
        message: 'User updated successfully',
        data: user
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async deleteUser(req, res) {
    try {
      const username = req.params.username

      await userService.deleteUser(username)

      res.status(200).json({
        message: 'User deleted successfully'
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
}

module.exports = userController
