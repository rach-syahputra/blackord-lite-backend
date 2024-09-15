const prisma = require('../db')

const findAllArtists = async () => {
  const artists = await prisma.artist.findMany()

  return artists
}

const findArtistByUsername = async (username) => {
  const artist = await prisma.artist.findUnique({
    where: {
      username
    }
  })

  return artist
}

const createArtist = async (artistData) => {
  const artist = await prisma.artist.create({
    data: {
      username: artistData.username,
      artistName: artistData.artistName,
      image: artistData.image,
      bio: artistData.bio
    }
  })

  return artist
}

const updateArtistByUsername = async (username, artistData) => {
  const artist = await prisma.artist.update({
    where: {
      username
    },
    data: {
      artistName: artistData.artistName,
      image: artistData.image,
      bio: artistData.bio
    }
  })

  return artist
}

module.exports = {
  findAllArtists,
  findArtistByUsername,
  createArtist,
  updateArtistByUsername
}
