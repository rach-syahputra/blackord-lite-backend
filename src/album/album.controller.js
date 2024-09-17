const albumService = require('./album.service')

const albumController = {
  async getAlbumsFromArtist(req, res) {
    try {
      const artistUsername = req.params.username
      const albums = await albumService.getAlbumsFromArtist(artistUsername)

      res.status(200).json({
        message: 'Albums from artist successfully retrieved',
        data: albums
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async getAlbum(req, res) {
    try {
      const id = req.params.id
      const album = await albumService.getAlbum(id)

      res.status(200).json({
        message: 'Album successfully retrieved',
        data: album
      })
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  },

  async addAlbum(req, res) {
    try {
      const albumData = req.body
      albumData.artistUsername = req.username

      const album = await albumService.addAlbum(albumData)

      res.status(201).json({
        message: 'Album added successfully',
        data: album
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  async deleteAlbum(req, res) {
    try {
      const usernameFromToken = req.username
      const id = req.params.id

      const album = await albumService.getAlbum(id)
      if (album.artistUsername !== usernameFromToken) {
        return res.status(401).json({
          message: 'You are unauthorized'
        })
      }

      await albumService.deleteAlbum(id)

      res.status(200).json({
        message: 'Album deleted successfully'
      })
    } catch (error) {
      res.status(400).json({
        message: error.message
      })
    }
  }
}

module.exports = albumController
