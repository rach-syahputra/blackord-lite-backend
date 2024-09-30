const { ResponseError } = require('../../utils/error/response-error')
const userService = require('./user.service')

const userController = {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll()

      res.status(200).json({
        message: 'Users successfully retrieved',
        data: users
      })
    } catch (error) {
      next(error)
    }
  },

  async get(req, res, next) {
    try {
      const username = req.params.username
      const user = await userService.get(username)

      res.status(200).json({
        message: 'User successfully retrieved',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },

  async add(req, res, next) {
    try {
      const userData = req.body

      const user = await userService.add(userData)

      res.status(201).json({
        message: 'User added successfully',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const tokenUsername = req.username
      const username = req.params.username
      if (tokenUsername !== username) {
        throw new ResponseError(401, 'You are unauthorized')
      }

      const userData = req.body

      const user = await userService.update(username, userData)

      res.status(200).json({
        message: 'User updated successfully',
        data: user
      })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const tokenUsername = req.username
      const username = req.params.username
      if (tokenUsername !== username) {
        throw new ResponseError(401, 'You are unauthorized')
      }

      await userService.delete(username)

      res.status(200).json({
        message: 'User deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
