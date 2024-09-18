const albumRepository = require('./album.repository')
const { ResponseError } = require('../error/response-error')

const albumService = {
  async getAlbumsFromArtist(artistUsername) {
    const albums = await albumRepository.findAlbumsByArtistUsername(
      artistUsername
    )

    return albums
  },

  async getAlbum(albumId) {
    const album = await albumRepository.findAlbumById(albumId)
    if (!album) throw new ResponseError(404, 'Album not found')

    return album
  },

  async addAlbum(albumData) {
    console.log(albumData)
    const album = await albumRepository.createAlbum(albumData)

    return album
  },

  async deleteAlbum(albumId) {
    await this.getAlbum(albumId)
    await albumRepository.deleteAlbumById(albumId)
  }
}

module.exports = albumService
