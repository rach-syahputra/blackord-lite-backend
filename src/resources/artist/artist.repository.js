const prisma = require('../../utils/db')

const artistRepository = {
  async findAll() {
    const artists = await prisma.artist.findMany()

    return artists
  },

  async find(username) {
    const artist = await prisma.artist.findUnique({
      where: {
        username
      }
    })

    return artist
  },

  async create(artistData) {
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

  async update(username, artistData) {
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
