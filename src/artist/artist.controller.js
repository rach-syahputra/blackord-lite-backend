const artistService = require('./artist.service')

const artistController = {
  async getAllArtists(req, res) {
    try {
      const artists = await artistService.getAllArtists()

      res.status(200).json({
        message: 'Artists successfully retrieved',
        data: artists
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async getArtist(req, res) {
    try {
      const username = req.params.username
      const artist = await artistService.getArtist(username)

      res.status(200).json({
        message: 'Artist successfully retrieved',
        data: artist
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async addArtist(req, res) {
    try {
      const artistData = req.body

      const artist = await artistService.addArtist(artistData)

      res.status(201).json({
        message: 'Artist added successfully',
        data: artist
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async updateArtist(req, res) {
    try {
      const username = req.params.username
      const artistData = req.body

      const artist = await artistService.updateArtist(username, artistData)

      res.status(200).json({
        message: 'Artist updated successfully',
        data: artist
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
}

module.exports = artistController
