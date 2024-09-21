const prisma = require('../../../db')

const listenerArtistRepository = {
  async findAllFavoriteArtistsFromListener(listenerUsername) {
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

  async findAllFollowersFromArtist(artistUsername) {
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

  async findFollowedArtist(listenerUsername, artistUsername) {
    const followedArtist = await prisma.listenerArtist.findMany({
      where: {
        listenerUsername,
        artistUsername
      }
    })

    return followedArtist
  },

  async createListenerArtist(listenerUsername, artistUsername) {
    const listenerArtist = await prisma.listenerArtist.create({
      data: {
        listenerUsername,
        artistUsername
      }
    })

    return listenerArtist
  },

  async deleteListenerArtist(listenerUsername, artistUsername) {
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
