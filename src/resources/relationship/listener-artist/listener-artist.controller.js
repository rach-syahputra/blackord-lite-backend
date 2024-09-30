const listenerArtistService = require('./listener-artist.service')

const listenerArtistController = {
  async getFavoriteArtistsFromListener(req, res, next) {
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

  async getFollowersFromArtist(req, res, next) {
    try {
      const artistUsername = req.params.username

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

  async get(req, res, next) {
    try {
      const listenerUsername = req.params.username
      const artistUsername = req.params.artistUsername

      const listenerArtist = await listenerArtistService.get(
        listenerUsername,
        artistUsername
      )

      res.status(200).json({
        message: 'Followed artist successfully retrieved',
        data: listenerArtist
      })
    } catch (error) {
      next(error)
    }
  },

  async add(req, res, next) {
    try {
      const listenerUsername = req.username
      const artistUsername = req.params.username

      const followedArtist = await listenerArtistService.add(
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

  async delete(req, res, next) {
    try {
      const listenerUsername = req.username
      const artistUsername = req.params.username

      await listenerArtistService.delete(listenerUsername, artistUsername)

      res.status(200).json({
        message: 'Artist successfully unfollowed'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = listenerArtistController
