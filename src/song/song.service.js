const {
  findSongsByAlbumId,
  findSongById,
  createSong,
  deleteSongById
} = require('./song.repository')

const getSongsFromAlbum = async (albumId) => {
  const songs = await findSongsByAlbumId(albumId)

  return songs
}

const getSong = async (songId) => {
  const song = await findSongById(songId)

  return song
}

const addSong = async (songData) => {
  const song = await createSong(songData)

  return song
}

const deleteSong = async (songId) => {
  await deleteSongById(songId)
}

module.exports = {
  getSongsFromAlbum,
  getSong,
  addSong,
  deleteSong
}
