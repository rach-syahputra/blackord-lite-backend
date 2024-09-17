const songRepository = require('./song.repository')

const songService = {
  async getSongsFromAlbum(albumId) {
    const songs = await songRepository.findSongsByAlbumId(albumId)

    return songs
  },

  async getSong(songId) {
    const song = await songRepository.findSongById(songId)

    return song
  },

  async addSong(songData) {
    const song = await songRepository.createSong(songData)

    return song
  },

  async deleteSong(songId) {
    await songRepository.deleteSongById(songId)
  }
}

module.exports = songService
