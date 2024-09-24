const { ResponseError } = require('../../../utils/error/response-error')
const listenerArtistRepository = require('./listener-artist.repository')

const listenerArtistService = {
  async getAllFavoriteArtistsFromListener(listenerUsername) {
    const response =
      await listenerArtistRepository.findAllFavoriteArtistsFromListener(
        listenerUsername
      )

    const favoriteArtists = response.map((res) => res.artistUsername)

    return favoriteArtists
  },

  async getAllFollowersFromArtist(artistUsername) {
    const response = await listenerArtistRepository.findAllFollowersFromArtist(
      artistUsername
    )

    const followers = response.map((res) => res.listenerUsername)

    return followers
  },

  async getFollowedArtist(listenerUsername, artistUsername) {
    const followedArtist = await listenerArtistRepository.findFollowedArtist(
      listenerUsername,
      artistUsername
    )
    if (!followedArtist) {
      throw new ResponseError(404, 'Followed artist not found')
    }

    return followedArtist
  },

  async addFollowedArtist(listenerUsername, artistUsername) {
    const followedArtist = await listenerArtistRepository.createListenerArtist(
      listenerUsername,
      artistUsername
    )

    return followedArtist.artistUsername
  },

  async deleteFollowedArtist(listenerUsername, artistUsername) {
    await this.getFollowedArtist(listenerUsername, artistUsername)
    await listenerArtistRepository.deleteListenerArtist(
      listenerUsername,
      artistUsername
    )
  }
}

module.exports = listenerArtistService
