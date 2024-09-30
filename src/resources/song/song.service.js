const songRepository = require('./song.repository')
const albumService = require('../album/album.service')
const artistService = require('../artist/artist.service')
const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const { AddSongSchema } = require('./song.validation')

const songService = {
  async getFromAlbum(albumId) {
    const songs = await songRepository.findByAlbum(albumId)

    return songs
  },

  async get(songId) {
    const song = await songRepository.find(songId)
    if (!song) throw new ResponseError(404, 'Song not found')

    return song
  },

  async add(songData) {
    validate(AddSongSchema, songData)

    const song = await songRepository.create(songData)

    return song
  },

  async delete(songId) {
    await this.get(songId)
    await songRepository.delete(songId)
  },

  async checkOwner(tokenUsername, songId) {
    const song = await this.get(songId)
    const album = await albumService.get(song.albumId)
    const artist = await artistService.get(album.artistUsername)

    if (tokenUsername !== artist.username)
      throw new ResponseError(401, 'You are unauthorized')
  }
}

module.exports = songService
