const cloudinary = require('../../utils/cloudinary')

const artistImageRepository = {
  async upload(image) {
    const artistImage = await cloudinary.uploader.upload(image, {
      folder: 'artist-images'
    })

    return artistImage
  },

  async delete(image) {
    const artistImage = await cloudinary.uploader.destroy(image)

    return artistImage
  }
}

module.exports = artistImageRepository
