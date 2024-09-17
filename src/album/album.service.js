const albumRepository = require('./album.repository')

const albumService = {
  async getAlbumsFromArtist(artistUsername) {
    const albums = await albumRepository.findAlbumsByArtistUsername(
      artistUsername
    )

    return albums
  },

  async getAlbum(albumId) {
    const album = await albumRepository.findAlbumById(albumId)

    return album
  },

  async addAlbum(albumData) {
    const album = await albumRepository.createAlbum(albumData)

    return album
  },

  async deleteAlbum(albumId) {
    await albumRepository.deleteAlbumById(albumId)
  }
}

module.exports = albumService
