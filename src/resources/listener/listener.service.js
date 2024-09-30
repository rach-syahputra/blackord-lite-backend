const listenerRepository = require('./listener.repository')
const listenerImageRepository = require('./listener.image.repository')
const { validate } = require('../../utils/validation/validation')
const { ResponseError } = require('../../utils/error/response-error')
const {
  AddListenerSchema,
  UpdateListenerSchema
} = require('./listener.validation')
const {
  getCloudinaryPublicId
} = require('../../utils/cloudinary/cloudinary-public-id')

const listenerService = {
  async get(username) {
    const listener = await listenerRepository.find(username)

    if (!listener) {
      throw new ResponseError(404, 'Listener not found')
    }

    return listener
  },

  async add(listenerData) {
    const listenerExist = await listenerRepository.find(listenerData.username)
    if (listenerExist) throw new ResponseError(409, 'Listener already exists')

    listenerData.image = await this.uploadImage(listenerData.imageFile.path)
    delete listenerData.imageFile

    validate(AddListenerSchema, listenerData)
    const listener = await listenerRepository.create(listenerData)

    return listener
  },

  async update(username, listenerData) {
    await this.get(username)

    listenerData.image = await this.uploadImage(listenerData.imageFile.path)
    delete listenerData.imageFile

    const previousListenerImage = await listenerRepository.find(username)
    await this.deleteImage(previousListenerImage.image)

    validate(UpdateListenerSchema, listenerData)
    const listener = await listenerRepository.update(username, listenerData)

    return listener
  },

  async uploadImage(image) {
    const listenerImage = await listenerImageRepository.upload(image)
    if (!listenerImage) throw new ResponseError(422, 'Image not uploaded')

    return listenerImage.secure_url
  },

  async deleteImage(image) {
    const publicId = getCloudinaryPublicId(image)

    const previousListenerImageDeleted = await listenerImageRepository.delete(
      publicId
    )
    if (!previousListenerImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = listenerService
