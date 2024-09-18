const { ResponseError } = require('../error/response-error')
const albumService = require('./album.service')

const albumController = {
  async getAlbumsFromArtist(req, res, next) {
    try {
      const artistUsername = req.params.username
      const albums = await albumService.getAlbumsFromArtist(artistUsername)

      res.status(200).json({
        message: 'Albums from artist successfully retrieved',
        data: albums
      })
    } catch (error) {
      next(error)
    }
  },

  async getAlbum(req, res, next) {
    try {
      const id = req.params.id
      const album = await albumService.getAlbum(id)

      res.status(200).json({
        message: 'Album successfully retrieved',
        data: album
      })
    } catch (error) {
      next(error)
    }
  },

  async addAlbum(req, res, next) {
    try {
      const albumData = req.body
      albumData.artistUsername = req.username

      const album = await albumService.addAlbum(albumData)

      res.status(201).json({
        message: 'Album added successfully',
        data: album
      })
    } catch (error) {
      next(error)
    }
  },

  async deleteAlbum(req, res, next) {
    try {
      const id = req.params.id
      const album = await albumService.getAlbum(id)

      const tokenUsername = req.username
      if (album.artistUsername !== tokenUsername)
        throw new ResponseError(401, 'You are unauthorized')

      await albumService.deleteAlbum(id)

      res.status(200).json({
        message: 'Album deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = albumController
