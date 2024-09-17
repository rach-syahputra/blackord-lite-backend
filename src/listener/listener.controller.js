const listenerService = require('./listener.service')

const listenerController = {
  async getListener(req, res) {
    try {
      const username = req.params.username
      const listener = await listenerService.getListener(username)

      res.status(200).json({
        message: 'Listener successfully retrieved',
        data: listener
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async addListener(req, res) {
    try {
      const listenerData = req.body

      const listener = await listenerService.addListener(listenerData)

      res.status(201).json({
        message: 'Listener added successfully',
        data: listener
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async updateListener(req, res) {
    try {
      const tokenUsername = req.username
      const listenerUsername = req.params.username
      if (tokenUsername !== listenerUsername) {
        return res.status(401).json({
          message: 'You are unauthorized'
        })
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
      res.status(400).json({
        message: error.message
      })
    }
  }
}

module.exports = listenerController
