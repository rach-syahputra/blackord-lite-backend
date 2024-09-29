const cloudinary = require('../../utils/cloudinary')

const artistImageRepository = {
  async uploadArtistImage(image) {
    const artistImage = await cloudinary.uploader.upload(image, {
      folder: 'artist-images'
    })

    return artistImage
  },

  async deleteArtistImage(image) {
    const artistImage = await cloudinary.uploader.destroy(image)

    return artistImage
  }
}

module.exports = artistImageRepository
