const cloudinary = require('../../utils/cloudinary')

const listenerImageRepository = {
  async uploadListenerImage(image) {
    const listenerImage = await cloudinary.uploader.upload(image, {
      folder: 'listener-images'
    })

    return listenerImage
  },

  async deleteListenerImage(publicId) {
    const listenerImage = await cloudinary.uploader.destroy(publicId)

    return listenerImage
  }
}

module.exports = listenerImageRepository
