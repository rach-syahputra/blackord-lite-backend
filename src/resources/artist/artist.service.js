const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const artistRepository = require('./artist.repository')
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
    validate(AddArtistSchema, artistData)

    const artistExists = await artistRepository.findArtistByUsername(
      artistData.username
    )
    if (artistExists) throw new ResponseError(409, 'Artist already exists')

    const artist = await artistRepository.createArtist(artistData)

    return artist
  },

  async updateArtist(username, artistData) {
    validate(UpdateArtistSchema, artistData)

    await this.getArtist(username)

    const artist = await artistRepository.updateArtistByUsername(
      username,
      artistData
    )

    return artist
  }
}

module.exports = artistService
