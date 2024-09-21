const prisma = require('../../db')

const albumRepository = {
  async findAlbumCount(artistUsername) {
    const albumCount = await prisma.album.count({
      where: {
        artistUsername
      }
    })

    return albumCount
  },

  async findAlbumsByArtistUsername(artistUsername) {
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

  async findAlbumById(albumId) {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId
      }
    })

    return album
  },

  async createAlbum(albumData) {
    const albumCount = await this.findAlbumCount(albumData.artistUsername)

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

  async deleteAlbumById(albumId) {
    await prisma.album.delete({
      where: {
        id: albumId
      }
    })
  }
}

module.exports = albumRepository
