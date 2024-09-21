const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const artistRepository = require('./artist.repository')
const artistImageRepository = require('./artist.image.repository')
const { AddArtistSchema, UpdateArtistSchema } = require('./artist.validation')

const artistService = {
  async getAllArtists() {
    const artists = await artistRepository.findAllArtists()

    return artists
  },

  async getArtist(username) {
    const artist = await artistRepository.findArtistByUsername(username)

    if (!artist) throw new ResponseError(404, 'Artist not found')

    return artist
  },

  async addArtist(artistData) {
    const artistExists = await artistRepository.findArtistByUsername(
      artistData.username
    )
    if (artistExists) throw new ResponseError(409, 'Artist already exists')

    artistData.image = await this.uploadArtistImage(artistData.imageFile.path)
    delete artistData.imageFile

    validate(AddArtistSchema, artistData)
    const artist = await artistRepository.createArtist(artistData)

    return artist
  },

  async updateArtist(username, artistData) {
    await this.getArtist(username)

    artistData.image = await this.uploadArtistImage(artistData.imageFile.path)
    delete artistData.imageFile

    const previousArtistImage = await artistRepository.findArtistByUsername(
      username
    )
    await this.deleteArtistImage(previousArtistImage.image)

    validate(UpdateArtistSchema, artistData)
    const artist = await artistRepository.updateArtistByUsername(
      username,
      artistData
    )

    return artist
  },

  async uploadArtistImage(image) {
    const artistImage = await artistImageRepository.uploadArtistImage(image)
    if (!artistImage) throw new ResponseError(422, 'Image not uploaded')

    return artistImage.secure_url
  },

  async deleteArtistImage(image) {
    const artistImageFolder = process.env.CLOUDINARY_ARTIST_IMAGE_FOLDER

    const previousArtistImageDeleted =
      await artistImageRepository.deleteArtistImage(
        `${artistImageFolder}/${image}`
      )
    if (!previousArtistImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = artistService
