const { ResponseError } = require('../../../utils/error/response-error')
const listenerArtistRepository = require('./listener-artist.repository')

const listenerArtistService = {
  async getAllFavoriteArtistsFromListener(listenerUsername) {
    const favoriteArtists =
      await listenerArtistRepository.findAllFavoriteArtistsFromListener(
        listenerUsername
      )

    return favoriteArtists
  },

  async getAllFollowersFromArtist(artistUsername) {
    const followers = await listenerArtistRepository.findAllFollowersFromArtist(
      artistUsername
    )

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
