const prisma = require('../db')
const { v4: uuidv4 } = require('uuid')

const findSongsByAlbumId = async (albumId) => {
  const songs = await prisma.song.findMany({
    where: {
      albumId
    },
    orderBy: {
      title: 'asc'
    }
  })

  return songs
}

const findSongById = async (songId) => {
  const song = await prisma.song.findUnique({
    where: {
      id: songId
    }
  })

  return song
}

const createSong = async (songData) => {
  const song = await prisma.song.create({
    data: {
      id: uuidv4(),
      albumId: songData.albumId,
      title: songData.title,
      duration: songData.duration
    }
  })

  return song
}

const deleteSongById = async (songId) => {
  await prisma.song.delete({
    where: {
      id: songId
    }
  })
}

module.exports = {
  findSongsByAlbumId,
  findSongById,
  createSong,
  deleteSongById
}
