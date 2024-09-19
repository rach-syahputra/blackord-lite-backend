const listenerArtistService = require('./listener-artist.service')

const listenerArtistController = {
  async getAllFavoriteArtistsFromListener(req, res, next) {
    try {
      const listenerUsername = req.params.username

      const favoriteArtists =
        await listenerArtistService.getAllFavoriteArtistsFromListener(
          listenerUsername
        )

      res.status(200).json({
        message: 'Favorite artists successfully retrieved',
        data: favoriteArtists
      })
    } catch (error) {
      next(error)
    }
  },

  async getAllFollowersFromArtist(req, res, next) {
    try {
      const artistUsername = req.params.id

      const followers = await listenerArtistService.getAllFollowersFromArtist(
        artistUsername
      )

      res.status(200).json({
        message: 'Artist followers successfully retrieved',
        data: followers
      })
    } catch (error) {
      next(error)
    }
  },

  async addFollowedArtist(req, res, next) {
    try {
      const listenerUsername = req.username
      const artistUsername = req.params.username

      const followedArtist = await listenerArtistService.addFollowedArtist(
        listenerUsername,
        artistUsername
      )

      res.status(200).json({
        message: 'Artist successfully followed',
        data: followedArtist
      })
    } catch (error) {
      next(error)
    }
  },

  async deleteFollowedArtist(req, res, next) {
    try {
      const listenerUsername = req.username
      const artistUsername = req.params.username

      await listenerArtistService.deleteFollowedArtist(
        listenerUsername,
        artistUsername
      )

      res.status(200).json({
        message: 'Artist successfully unfollowed'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = listenerArtistController
