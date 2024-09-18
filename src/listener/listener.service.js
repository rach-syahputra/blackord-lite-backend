const { ResponseError } = require('../error/response-error')
const listenerRepository = require('./listener.repository')

const listenerService = {
  async getListener(username) {
    const listener = await listenerRepository.findListenerByUsername(username)

    if (!listener) {
      throw new ResponseError(404, 'Listener not found')
    }

    return listener
  },

  async addListener(listenerData) {
    const listener = await listenerRepository.createListener(listenerData)

    return listener
  },

  async updateListener(username, listenerData) {
    const listener = await listenerRepository.updateListenerByUsername(
      username,
      listenerData
    )

    return listener
  }
}

module.exports = listenerService
