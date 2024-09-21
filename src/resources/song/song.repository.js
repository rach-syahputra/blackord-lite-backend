const prisma = require('../../utils/db')
const { v4: uuidv4 } = require('uuid')

const songRepository = {
  async findSongsByAlbumId(albumId) {
    const songs = await prisma.song.findMany({
      where: {
        albumId
      },
      orderBy: {
        title: 'asc'
      }
    })

    return songs
  },

  async findSongById(songId) {
    const song = await prisma.song.findUnique({
      where: {
        id: songId
      }
    })

    return song
  },

  async createSong(songData) {
    const song = await prisma.song.create({
      data: {
        id: uuidv4(),
        albumId: songData.albumId,
        title: songData.title,
        duration: songData.duration
      }
    })

    return song
  },

  async deleteSongById(songId) {
    await prisma.song.delete({
      where: {
        id: songId
      }
    })
  }
}

module.exports = songRepository
