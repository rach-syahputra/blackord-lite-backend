const { ResponseError } = require('../../utils/error/response-error')
const artistService = require('./artist.service')

const artistController = {
  async getAll(req, res, next) {
    try {
      const artists = await artistService.getAll()

      res.status(200).json({
        message: 'Artists successfully retrieved',
        data: artists
      })
    } catch (error) {
      next(error)
    }
  },

  async get(req, res, next) {
    try {
      const username = req.params.username
      const artist = await artistService.get(username)

      res.status(200).json({
        message: 'Artist successfully retrieved',
        data: artist
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

      const artistData = req.body
      artistData.imageFile = req.file

      const artist = await artistService.add(artistData)

      res.status(201).json({
        message: 'Artist added successfully',
        data: artist
      })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
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

      const artist = await artistService.update(artistUsername, artistData)

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
