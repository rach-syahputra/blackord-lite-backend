const userService = require('./user.service')

const userController = {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()

      res.status(200).json({
        message: 'Users successfully retrieved',
        data: users
      })
    } catch (error) {
      next(error)
    }
  },

  async getUser(req, res, next) {
    try {
      const username = req.params.username
      const user = await userService.getUser(username)

      res.status(200).json({
        message: 'User successfully retrieved',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },

  async addUser(req, res, next) {
    try {
      const userData = req.body

      const user = await userService.addUser(userData)

      res.status(201).json({
        message: 'User added successfully',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },

  async updateUser(req, res, next) {
    try {
      const username = req.params.username
      const userData = req.body

      const user = await userService.updateUser(username, userData)

      res.status(200).json({
        message: 'User updated successfully',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },

  async deleteUser(req, res, next) {
    try {
      const username = req.params.username

      await userService.deleteUser(username)

      res.status(200).json({
        message: 'User deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
