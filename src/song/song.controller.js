const albumService = require('../album/album.service')
const songService = require('./song.service')

const songController = {
  async getSongsFromAlbum(req, res, next) {
    try {
      const albumId = req.params.albumId
      const songs = await songService.getSongsFromAlbum(albumId)

      res.status(200).json({
        message: 'Songs from album successfully retrieved',
        data: songs
      })
    } catch (error) {
      next(error)
    }
  },

  async getSong(req, res, next) {
    try {
      const id = req.params.id
      const song = await songService.getSong(id)

      res.status(200).json({
        message: 'Song successfully retrieved',
        data: song
      })
    } catch (error) {
      next(error)
    }
  },

  async addSong(req, res, next) {
    try {
      const songData = req.body

      await albumService.checkAlbumOwner(req.username, songData.albumId)
      const song = await songService.addSong(songData)

      res.status(201).json({
        message: 'Song added successfully',
        data: song
      })
    } catch (error) {
      next(error)
    }
  },

  async deleteSong(req, res, next) {
    try {
      const songId = req.params.id

      await songService.checkSongOwner(req.username, songId)
      await songService.deleteSong(songId)

      res.status(200).json({
        message: 'Song deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = songController
