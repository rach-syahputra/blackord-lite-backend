const { ResponseError } = require('../../../utils/error/response-error')
const listenerArtistRepository = require('./listener-artist.repository')

const listenerArtistService = {
  async getAllFavoriteArtistsFromListener(listenerUsername) {
    const response =
      await listenerArtistRepository.findFavoriteArtistsFromListener(
        listenerUsername
      )

    const favoriteArtists = response.map((res) => res.artistUsername)

    return favoriteArtists
  },

  async getAllFollowersFromArtist(artistUsername) {
    const response = await listenerArtistRepository.findFollowersFromArtist(
      artistUsername
    )

    const followers = response.map((res) => res.listenerUsername)

    return followers
  },

  async get(listenerUsername, artistUsername) {
    const followedArtist = await listenerArtistRepository.find(
      listenerUsername,
      artistUsername
    )
    if (!followedArtist) {
      throw new ResponseError(404, 'Followed artist not found')
    }

    return followedArtist
  },

  async add(listenerUsername, artistUsername) {
    const followedArtist = await listenerArtistRepository.create(
      listenerUsername,
      artistUsername
    )

    return followedArtist.artistUsername
  },

  async delete(listenerUsername, artistUsername) {
    await this.get(listenerUsername, artistUsername)
    await listenerArtistRepository.delete(listenerUsername, artistUsername)
  }
}

module.exports = listenerArtistService
