const songRepository = require('./song.repository')
const albumService = require('../album/album.service')
const artistService = require('../artist/artist.service')
const { ResponseError } = require('../../utils/error/response-error')
const { validate } = require('../../utils/validation/validation')
const { AddSongSchema } = require('./song.validation')

const songService = {
  async getSongsFromAlbum(albumId) {
    const songs = await songRepository.findSongsByAlbumId(albumId)

    return songs
  },

  async getSong(songId) {
    const song = await songRepository.findSongById(songId)
    if (!song) throw new ResponseError(404, 'Song not found')

    return song
  },

  async addSong(songData) {
    validate(AddSongSchema, songData)

    const song = await songRepository.createSong(songData)

    return song
  },

  async deleteSong(songId) {
    await this.getSong(songId)
    await songRepository.deleteSongById(songId)
  },

  async checkSongOwner(tokenUsername, songId) {
    const song = await this.getSong(songId)
    const album = await albumService.getAlbum(song.albumId)
    const artist = await artistService.getArtist(album.artistUsername)

    if (tokenUsername !== artist.username)
      throw new ResponseError(401, 'You are unauthorized')
  }
}

module.exports = songService
