const albumRepository = require('./album.repository')
const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const { AddAlbumSchema } = require('./album.validation')
const albumImageRepository = require('./album.image.repository')
const {
  getCloudinaryPublicId
} = require('../../utils/cloudinary/cloudinary-public-id')

const albumService = {
  async getFromArtist(artistUsername) {
    const albums = await albumRepository.findByArtist(artistUsername)

    return albums
  },

  async get(albumId) {
    const album = await albumRepository.find(albumId)
    if (!album) throw new ResponseError(404, 'Album not found')

    return album
  },

  async add(albumData) {
    albumData.image = await this.uploadImage(albumData.imageFile.path)
    delete albumData.imageFile

    validate(AddAlbumSchema, albumData)

    const album = await albumRepository.create(albumData)

    return album
  },

  async delete(albumId) {
    const album = await this.get(albumId)
    await this.deleteImage(album.image)

    await albumRepository.delete(albumId)
  },

  async checkOwner(tokenUsername, albumId) {
    const album = await this.get(albumId)

    if (tokenUsername !== album.artistUsername)
      throw new ResponseError(401, 'You are unauthorized')
  },

  async uploadImage(image) {
    const albumImage = await albumImageRepository.upload(image)
    if (!albumImage) throw new ResponseError(422, 'Image not uploaded')

    return albumImage.secure_url
  },

  async deleteImage(image) {
    const publicId = getCloudinaryPublicId(image)

    const previousAlbumImageDeleted = await albumImageRepository.delete(
      publicId
    )
    if (!previousAlbumImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = albumService
