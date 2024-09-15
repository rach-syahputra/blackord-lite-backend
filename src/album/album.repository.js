const prisma = require('../db')

const findAlbumCount = async (artistUsername) => {
  const albumCount = await prisma.album.count({
    where: {
      artistUsername
    }
  })

  console.log(artistUsername)
  console.log(albumCount)

  return albumCount
}

const findAlbumsByArtistUsername = async (artistUsername) => {
  const albums = await prisma.album.findMany({
    where: {
      artistUsername
    },
    orderBy: {
      title: 'asc'
    }
  })

  return albums
}

const findAlbumById = async (albumId) => {
  const album = await prisma.album.findUnique({
    where: {
      id: albumId
    }
  })

  return album
}

const createAlbum = async (albumData) => {
  const albumCount = await findAlbumCount(albumData.artistUsername)

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
}

const deleteAlbumById = async (albumId) => {
  await prisma.album.delete({
    where: {
      id: albumId
    }
  })
}

module.exports = {
  findAlbumsByArtistUsername,
  findAlbumById,
  createAlbum,
  deleteAlbumById
}
