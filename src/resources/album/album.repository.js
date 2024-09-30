const prisma = require('../../utils/db')

const albumRepository = {
  async findCount(artistUsername) {
    const albumCount = await prisma.album.count({
      where: {
        artistUsername
      }
    })

    return albumCount
  },

  async findByArtist(artistUsername) {
    const albums = await prisma.album.findMany({
      where: {
        artistUsername
      },
      orderBy: {
        title: 'asc'
      }
    })

    return albums
  },

  async find(albumId) {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId
      }
    })

    return album
  },

  async create(albumData) {
    const albumCount = await this.findCount(albumData.artistUsername)

    const album = await prisma.album.create({
      data: {
        id: `${albumData.artistUsername}-${albumData.title
          .replace(/\s+/g, '-')
          .toLowerCase()}-${albumCount + 1}`.toLowerCase(),
        artistUsername: albumData.artistUsername,
        title: albumData.title,
        genre: albumData.genre,
        image: albumData.image
      }
    })

    return album
  },

  async delete(albumId) {
    await prisma.album.delete({
      where: {
        id: albumId
      }
    })
  }
}

module.exports = albumRepository
