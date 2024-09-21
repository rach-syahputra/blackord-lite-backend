const listenerRepository = require('./listener.repository')
const { validate } = require('../../utils/validation/validation')
const { ResponseError } = require('../../utils/error/response-error')
const {
  AddListenerSchema,
  UpdateListenerSchema
} = require('./listener.validation')

const listenerService = {
  async getListener(username) {
    const listener = await listenerRepository.findListenerByUsername(username)

    if (!listener) {
      throw new ResponseError(404, 'Listener not found')
    }

    return listener
  },

  async addListener(listenerData) {
    validate(AddListenerSchema, listenerData)

    const listenerExist = await listenerRepository.findListenerByUsername(
      listenerData.username
    )
    if (listenerExist) throw new ResponseError(409, 'Listener already exists')

    const listener = await listenerRepository.createListener(listenerData)

    return listener
  },

  async updateListener(username, listenerData) {
    validate(UpdateListenerSchema, listenerData)

    const listener = await listenerRepository.updateListenerByUsername(
      username,
      listenerData
    )

    return listener
  }
}

module.exports = listenerService
