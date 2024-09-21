const listenerRepository = require('./listener.repository')
const listenerImageRepository = require('./listener.image.repository')
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
    const listenerExist = await listenerRepository.findListenerByUsername(
      listenerData.username
    )
    if (listenerExist) throw new ResponseError(409, 'Listener already exists')

    listenerData.image = await this.uploadListenerImage(
      listenerData.imageFile.path
    )
    delete listenerData.imageFile

    validate(AddListenerSchema, listenerData)
    const listener = await listenerRepository.createListener(listenerData)

    return listener
  },

  async updateListener(username, listenerData) {
    await this.getListener(username)

    listenerData.image = await this.uploadListenerImage(
      listenerData.imageFile.path
    )
    delete listenerData.imageFile

    const previousListenerImage =
      await listenerRepository.findListenerByUsername(username)
    await this.deleteListenerImage(previousListenerImage.image)

    validate(UpdateListenerSchema, listenerData)
    const listener = await listenerRepository.updateListenerByUsername(
      username,
      listenerData
    )

    return listener
  },

  async uploadListenerImage(image) {
    const listenerImage = await listenerImageRepository.uploadListenerImage(
      image
    )
    if (!listenerImage) throw new ResponseError(422, 'Image not uploaded')

    return listenerImage.secure_url
  },

  async deleteListenerImage(image) {
    const listenerImageFolder = process.env.CLOUDINARY_LISTENER_IMAGE_FOLDER

    const previousListenerImageDeleted =
      await listenerImageRepository.deleteListenerImage(
        `${listenerImageFolder}/${image}`
      )
    if (!previousListenerImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = listenerService
