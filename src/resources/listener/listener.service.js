const listenerRepository = require('./listener.repository')
const { validate } = require('../../utils/validation/validation')
const { ResponseError } = require('../../utils/error/response-error')
const {
  AddListenerSchema,
  UpdateListenerSchema
} = require('./listener.validation')
const cloudinary = require('../../utils/cloudinary')

const listenerService = {
  async getListener(username) {
    const listener = await listenerRepository.findListenerByUsername(username)

    if (!listener) {
      throw new ResponseError(404, 'Listener not found')
    }

    return listener
  },

  async addListener(listenerData) {
    const listenerExist = await listenerRepository.findListenerByUsername(
      listenerData.username
    )
    if (listenerExist) throw new ResponseError(409, 'Listener already exists')

    const listenerImage = await cloudinary.uploader.upload(
      listenerData.imageFile.path,
      {
        folder: 'listener-images'
      }
    )
    listenerData.image = listenerImage.secure_url
    delete listenerData.imageFile

    validate(AddListenerSchema, listenerData)
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
