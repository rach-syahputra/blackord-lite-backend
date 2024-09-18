const artistRepository = require('./artist.repository')

const artistService = {
  async getAllArtists() {
    const artists = await artistRepository.findAllArtists()

    return artists
  },

  async getArtist(username) {
    const artist = await artistRepository.findArtistByUsername(username)

    if (!artist) throw Error('Artist not found')

    return artist
  },

  async addArtist(artistData) {
    const artist = await artistRepository.createArtist(artistData)

    return artist
  },

  async updateArtist(username, artistData) {
    const artist = await artistRepository.updateArtistByUsername(
      username,
      artistData
    )

    return artist
  }
}

module.exports = artistService
