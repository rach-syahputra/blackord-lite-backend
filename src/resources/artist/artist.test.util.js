const prisma = require('../../utils/db')
const bcrypt = require('bcrypt')
const cloudinary = require('../../utils/cloudinary')
const {
  getCloudinaryPublicId
} = require('../../utils/cloudinary/cloudinary-public-id')

const listenerUsername = 'listener-test'
const artistUsername = 'artist-test'
const image = 'user-image'
const updatedImage = 'image-updated'
const password = '12345678'
const listenerEmail = 'listener.test@example.com'
const artistEmail = 'artist.test@example.com'
const listenerRoleId = 1
const artistRoleId = 2

const artistTest = {
  async createUserAsListener() {
    return await prisma.user.create({
      data: {
        username: listenerUsername,
        password: await bcrypt.hash(password, 10),
        email: listenerEmail,
        roleId: listenerRoleId
      }
    })
  },

  async createUserAsArtist() {
    return await prisma.user.create({
      data: {
        username: artistUsername,
        password: await bcrypt.hash(password, 10),
        email: artistEmail,
        roleId: artistRoleId
      }
    })
  },

  async createListener() {
    await prisma.listener.create({
      data: {
        username: listenerUsername,
        image
      }
    })
  },

  async createArtist() {
    await prisma.artist.create({
      data: {
        username: artistUsername,
        artistName: artistUsername,
        image,
        bio: 'artist bio test'
      }
    })
  },

  async getListenerByUsername() {
    const listener = await prisma.listener.findUnique({
      where: {
        username: listenerUsername
      }
    })

    if (!listener) throw new Error('Listener not found')

    return listener
  },

  async getArtistByUsername() {
    const artist = await prisma.artist.findUnique({
      where: {
        username: artistUsername
      }
    })

    if (!artist) throw new Error('Artist not found')

    return artist
  },

  async updateListener() {
    await prisma.listener.update({
      where: {
        username: listenerUsername
      },
      data: {
        image: updatedImage
      }
    })
  },

  async deleteListener() {
    await prisma.user.delete({
      where: {
        username: listenerUsername
      }
    })
  },

  async deleteArtist() {
    await prisma.user.delete({
      where: {
        username: artistUsername
      }
    })
  },

  async deleteImage(image) {
    const publicId = getCloudinaryPublicId(image)
    await cloudinary.uploader.destroy(publicId)
  },

  async createListenerArtist() {
    await prisma.listenerArtist.create({
      data: {
        listenerUsername,
        artistUsername
      }
    })
  },

  async deleteListenerArtist() {
    await prisma.listenerArtist.delete({
      where: {
        listenerUsername,
        artistUsername
      }
    })
  }
}

module.exports = artistTest