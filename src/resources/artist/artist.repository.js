const prisma = require('../../utils/db')

const artistRepository = {
  async findUserByUsername(username) {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    return user
  },

  async findAllArtists() {
    const artists = await prisma.artist.findMany()

    return artists
  },

  async findArtistByUsername(username) {
    const artist = await prisma.artist.findUnique({
      where: {
        username
      }
    })

    return artist
  },

  async createArtist(artistData) {
    const artist = await prisma.artist.create({
      data: {
        username: artistData.username,
        artistName: artistData.artistName,
        image: artistData.image,
        bio: artistData.bio
      }
    })

    return artist
  },

  async updateArtistByUsername(username, artistData) {
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
}

module.exports = artistRepository
