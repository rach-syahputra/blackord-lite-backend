const albumService = require('../album/album.service')
const songService = require('./song.service')

const songController = {
  async getFromAlbum(req, res, next) {
    try {
      const albumId = req.params.albumId
      const songs = await songService.getFromAlbum(albumId)

      res.status(200).json({
        message: 'Songs from album successfully retrieved',
        data: songs
      })
    } catch (error) {
      next(error)
    }
  },

  async get(req, res, next) {
    try {
      const id = req.params.id
      const song = await songService.get(id)

      res.status(200).json({
        message: 'Song successfully retrieved',
        data: song
      })
    } catch (error) {
      next(error)
    }
  },

  async add(req, res, next) {
    try {
      const songData = req.body

      await albumService.checkOwner(req.username, songData.albumId)
      const song = await songService.add(songData)

      res.status(201).json({
        message: 'Song added successfully',
        data: song
      })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const songId = req.params.id

      await songService.checkOwner(req.username, songId)
      await songService.delete(songId)

      res.status(200).json({
        message: 'Song deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = songController
