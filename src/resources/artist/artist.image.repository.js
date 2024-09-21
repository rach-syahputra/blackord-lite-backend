const cloudinary = require('../../utils/cloudinary')

const artistImageRepository = {
  async uploadArtistImage(image) {
    const artistImage = await cloudinary.uploader.upload(image, {
      folder: process.env.CLOUDINARY_ARTIST_IMAGE_FOLDER
    })

    return artistImage
  },

  async deleteArtistImage(image) {
    const artistImage = await cloudinary.uploader.destroy(image)

    return artistImage
  }
}

module.exports = artistImageRepository
