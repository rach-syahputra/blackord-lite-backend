const albumRepository = require('./album.repository')
const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const { AddAlbumSchema } = require('./album.validation')
const albumImageRepository = require('./album.image.repository')
const {
  getCloudinaryPublicId
} = require('../../utils/cloudinary/cloudinary-public-id')

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
    albumData.image = await this.uploadAlbumImage(albumData.imageFile.path)
    delete albumData.imageFile

    validate(AddAlbumSchema, albumData)

    const album = await albumRepository.createAlbum(albumData)

    return album
  },

  async deleteAlbum(albumId) {
    await this.getAlbum(albumId)
    await albumRepository.deleteAlbumById(albumId)
  },

  async checkAlbumOwner(tokenUsername, albumId) {
    const album = await this.getAlbum(albumId)

    if (tokenUsername !== album.artistUsername)
      throw new ResponseError(401, 'You are unauthorized')
  },

  async uploadAlbumImage(image) {
    const albumImage = await albumImageRepository.uploadAlbumImage(image)
    if (!albumImage) throw new ResponseError(422, 'Image not uploaded')

    return albumImage.secure_url
  },

  async deleteAlbumImage(image) {
    const publicId = getCloudinaryPublicId(image)

    const previousAlbumImageDeleted =
      await albumImageRepository.deleteArtistImage(publicId)
    if (!previousAlbumImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = albumService
