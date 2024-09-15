const {
  findArtistByUsername,
  createArtist,
  updateArtistByUsername,
  findAllArtists
} = require('./artist.repository')

const getAllArtists = async () => {
  const artists = await findAllArtists()

  return artists
}

const getArtist = async (username) => {
  const artist = await findArtistByUsername(username)

  if (!artist) {
    throw Error('Artist not found')
  }

  return artist
}

const addArtist = async (artistData) => {
  const artist = await createArtist(artistData)

  return artist
}

const updateArtist = async (username, artistData) => {
  const artist = await updateArtistByUsername(username, artistData)

  return artist
}

module.exports = {
  getAllArtists,
  getArtist,
  addArtist,
  updateArtist
}
