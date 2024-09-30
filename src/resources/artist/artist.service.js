const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const artistRepository = require('./artist.repository')
const artistImageRepository = require('./artist.image.repository')
const { AddArtistSchema, UpdateArtistSchema } = require('./artist.validation')
const userService = require('../user/user.service')
const {
  getCloudinaryPublicId
} = require('../../utils/cloudinary/cloudinary-public-id')

const artistService = {
  async getAll() {
    const artists = await artistRepository.findAll()

    return artists
  },

  async get(username) {
    const artist = await artistRepository.find(username)

    if (!artist) throw new ResponseError(404, 'Artist not found')

    return artist
  },

  async add(artistData) {
    const artistUsername = await userService.get(artistData.username)
    if (!artistUsername)
      throw new ResponseError(400, 'Username is not registered')

    const artistExists = await artistRepository.find(artistData.username)
    if (artistExists) throw new ResponseError(409, 'Artist already exists')

    artistData.image = await this.uploadImage(artistData.imageFile.path)
    delete artistData.imageFile

    validate(AddArtistSchema, artistData)
    const artist = await artistRepository.create(artistData)

    return artist
  },

  async update(username, artistData) {
    await this.get(username)

    artistData.image = await this.uploadImage(artistData.imageFile.path)
    delete artistData.imageFile

    const previousArtistImage = await artistRepository.find(username)
    await this.deleteImage(previousArtistImage.image)

    validate(UpdateArtistSchema, artistData)
    const artist = await artistRepository.update(username, artistData)

    return artist
  },

  async uploadImage(image) {
    const artistImage = await artistImageRepository.upload(image)
    if (!artistImage) throw new ResponseError(422, 'Image not uploaded')

    return artistImage.secure_url
  },

  async deleteImage(image) {
    const publicId = getCloudinaryPublicId(image)

    const previousArtistImageDeleted = await artistImageRepository.delete(
      publicId
    )
    if (!previousArtistImageDeleted)
      throw new ResponseError(422, 'Image not deleted')
  }
}

module.exports = artistService
