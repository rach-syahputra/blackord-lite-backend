const { ResponseError } = require('../../utils/error/response-error')
const albumService = require('./album.service')

const albumController = {
  async getFromArtist(req, res, next) {
    try {
      const artistUsername = req.params.username
      const albums = await albumService.getFromArtist(artistUsername)

      res.status(200).json({
        message: 'Albums from artist successfully retrieved',
        data: albums
      })
    } catch (error) {
      next(error)
    }
  },

  async get(req, res, next) {
    try {
      const id = req.params.id
      const album = await albumService.get(id)

      res.status(200).json({
        message: 'Album successfully retrieved',
        data: album
      })
    } catch (error) {
      next(error)
    }
  },

  async add(req, res, next) {
    try {
      if (!req.file) {
        throw new ResponseError(400, 'Image file is required')
      }

      const albumData = req.body
      albumData.artistUsername = req.username
      albumData.imageFile = req.file

      const album = await albumService.add(albumData)

      res.status(201).json({
        message: 'Album added successfully',
        data: album
      })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const tokenUsername = req.username
      const albumId = req.params.id

      await albumService.checkOwner(tokenUsername, albumId)
      await albumService.delete(albumId)

      res.status(200).json({
        message: 'Album deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = albumController
