const cloudinary = require('../../utils/cloudinary')

const albumImageRepository = {
  async uploadAlbumImage(image) {
    const albumImage = await cloudinary.uploader.upload(image, {
      folder: 'album-images'
    })

    return albumImage
  },

  async deleteAlbumImage(image) {
    const albumImage = await cloudinary.uploader.destroy(image)

    return albumImage
  }
}

module.exports = albumImageRepository
