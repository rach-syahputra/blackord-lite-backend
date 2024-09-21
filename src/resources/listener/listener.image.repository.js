const cloudinary = require('../../utils/cloudinary')

const listenerImageRepository = {
  async uploadListenerImage(image) {
    const listenerImage = await cloudinary.uploader.upload(image, {
      folder: process.env.CLOUDINARY_LISTENER_IMAGE_FOLDER
    })

    return listenerImage
  },

  async deleteListenerImage(image) {
    const listenerImage = await cloudinary.uploader.destroy(image)

    return listenerImage
  }
}

module.exports = listenerImageRepository
