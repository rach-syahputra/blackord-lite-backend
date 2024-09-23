const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const artistRepository = require('./artist.repository')
const artistImageRepository = require('./artist.image.repository')
const { AddArtistSchema, UpdateArtistSchema } = require('./artist.validation')
const {
  getCloudinaryPublicId
} = require('../../utils/cloudinary/cloudinary-public-id')

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
    const artistUsername = await artistRepository.findUserByUsername(
      artistData.username
    )
    if (!artistUsername)
      throw new ResponseError(400, 'Username is not registered')

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
    const publicId = getCloudinaryPublicId(image)

    const previousArtistImageDeleted =
      await artistImageRepository.deleteArtistImage(publicId)
    if (!previousArtistImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = artistService
