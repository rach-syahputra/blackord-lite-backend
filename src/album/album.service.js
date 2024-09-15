const {
  findAlbumsByArtistUsername,
  findAlbumById,
  createAlbum,
  deleteAlbumById
} = require('./album.repository')

const getAlbumsFromArtist = async (artistUsername) => {
  const albums = await findAlbumsByArtistUsername(artistUsername)

  return albums
}

const getAlbum = async (albumId) => {
  const album = await findAlbumById(albumId)

  return album
}

const addAlbum = async (albumData) => {
  const album = await createAlbum(albumData)

  return album
}

const deleteAlbum = async (albumId) => {
  await deleteAlbumById(albumId)
}

module.exports = {
  getAlbumsFromArtist,
  getAlbum,
  addAlbum,
  deleteAlbum
}
