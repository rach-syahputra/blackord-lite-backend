const prisma = require('../../../utils/db')

const listenerArtistRepository = {
  async findFavoriteArtistsFromListener(listenerUsername) {
    const favoriteArtists = await prisma.listenerArtist.findMany({
      where: {
        listenerUsername
      },
      select: {
        artistUsername: true
      }
    })

    return favoriteArtists
  },

  async findFollowersFromArtist(artistUsername) {
    const followers = await prisma.listenerArtist.findMany({
      where: {
        artistUsername
      },
      select: {
        listenerUsername: true
      }
    })

    return followers
  },

  async find(listenerUsername, artistUsername) {
    const listenerArtist = await prisma.listenerArtist.findMany({
      where: {
        listenerUsername,
        artistUsername
      }
    })

    return listenerArtist[0]
  },

  async create(listenerUsername, artistUsername) {
    const listenerArtist = await prisma.listenerArtist.create({
      data: {
        listenerUsername,
        artistUsername
      }
    })

    return listenerArtist
  },

  async delete(listenerUsername, artistUsername) {
    const listenerArtist = await prisma.listenerArtist.delete({
      where: {
        listenerUsername_artistUsername: {
          listenerUsername,
          artistUsername
        }
      }
    })

    return listenerArtist
  }
}

module.exports = listenerArtistRepository
