const { ResponseError } = require('../../error/response-error')
const listenerService = require('./listener.service')

const listenerController = {
  async getListener(req, res, next) {
    try {
      const username = req.params.username
      const listener = await listenerService.getListener(username)

      res.status(200).json({
        message: 'Listener successfully retrieved',
        data: listener
      })
    } catch (error) {
      next(error)
    }
  },

  async addListener(req, res, next) {
    try {
      const listenerData = req.body

      const listener = await listenerService.addListener(listenerData)

      res.status(201).json({
        message: 'Listener added successfully',
        data: listener
      })
    } catch (error) {
      next(error)
    }
  },

  async updateListener(req, res, next) {
    try {
      const tokenUsername = req.username
      const listenerUsername = req.params.username
      if (tokenUsername !== listenerUsername) {
        throw new ResponseError(401, 'You are unauthorized')
      }

      const listenerData = req.body
      const listener = await listenerService.updateListener(
        listenerUsername,
        listenerData
      )

      res.status(200).json({
        message: 'Listener updated successfully',
        data: listener
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = listenerController
