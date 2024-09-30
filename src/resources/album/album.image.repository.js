const cloudinary = require('../../utils/cloudinary')

const albumImageRepository = {
  async upload(image) {
    const albumImage = await cloudinary.uploader.upload(image, {
      folder: 'album-images'
    })

    return albumImage
  },

  async delete(image) {
    const albumImage = await cloudinary.uploader.destroy(image)

    return albumImage
  }
}

module.exports = albumImageRepository
