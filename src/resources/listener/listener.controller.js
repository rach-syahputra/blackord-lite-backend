const { ResponseError } = require('../../utils/error/response-error')
const listenerService = require('./listener.service')

const listenerController = {
  async get(req, res, next) {
    try {
      const username = req.params.username
      const listener = await listenerService.get(username)

      res.status(200).json({
        message: 'Listener successfully retrieved',
        data: listener
      })
    } catch (error) {
      next(error)
    }
  },

  async add(req, res, next) {
    try {
      if (!req.file) {
        throw new ResponseError(400, 'Image file is required')
      }

      const listenerData = req.body
      listenerData.imageFile = req.file

      const listener = await listenerService.add(listenerData)

      res.status(201).json({
        message: 'Listener added successfully',
        data: listener
      })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const tokenUsername = req.username
      const listenerUsername = req.params.username
      if (tokenUsername !== listenerUsername) {
        throw new ResponseError(401, 'You are unauthorized')
      }

      if (!req.file) {
        throw new ResponseError(400, 'Image file is required')
      }

      const listenerData = req.body
      listenerData.imageFile = req.file

      const listener = await listenerService.update(
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
