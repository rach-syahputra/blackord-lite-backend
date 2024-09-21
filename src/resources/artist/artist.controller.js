const { ResponseError } = require('../../utils/error/response-error')
const artistService = require('./artist.service')

const artistController = {
  async getAllArtists(req, res, next) {
    try {
      const artists = await artistService.getAllArtists()

      res.status(200).json({
        message: 'Artists successfully retrieved',
        data: artists
      })
    } catch (error) {
      next(error)
    }
  },

  async getArtist(req, res, next) {
    try {
      const username = req.params.username
      const artist = await artistService.getArtist(username)

      res.status(200).json({
        message: 'Artist successfully retrieved',
        data: artist
      })
    } catch (error) {
      next(error)
    }
  },

  async addArtist(req, res, next) {
    try {
      if (!req.file) {
        throw new ResponseError(400, 'Image file is required')
      }

      const artistData = req.body
      artistData.imageFile = req.file

      const artist = await artistService.addArtist(artistData)

      res.status(201).json({
        message: 'Artist added successfully',
        data: artist
      })
    } catch (error) {
      next(error)
    }
  },

  async updateArtist(req, res, next) {
    try {
      const tokenUsername = req.username
      const artistUsername = req.params.username
      if (tokenUsername !== artistUsername) {
        throw new ResponseError(401, 'You are unauthorized')
      }

      if (!req.file) {
        throw new ResponseError(400, 'Image file is required')
      }

      const artistData = req.body
      artistData.imageFile = req.file

      const artist = await artistService.updateArtist(
        artistUsername,
        artistData
      )

      res.status(200).json({
        message: 'Artist updated successfully',
        data: artist
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = artistController
