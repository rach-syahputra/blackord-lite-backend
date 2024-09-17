const songService = require('./song.service')

const songController = {
  async getSongsFromAlbum(req, res) {
    try {
      const albumId = req.params.albumId
      const songs = await songService.getSongsFromAlbum(albumId)

      res.status(200).json({
        message: 'Songs from album successfully retrieved',
        data: songs
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async getSong(req, res) {
    try {
      const id = req.params.id
      const song = await songService.getSong(id)

      res.status(200).json({
        message: 'Song successfully retrieved',
        data: song
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async addSong(req, res) {
    try {
      const songData = req.body

      const song = await songService.addSong(songData)

      res.status(201).json({
        message: 'Song added successfully',
        data: song
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async deleteSong(req, res) {
    try {
      const id = req.params.id

      await songService.deleteSong(id)

      res.status(200).json({
        message: 'Song deleted successfully'
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
}

module.exports = songController
