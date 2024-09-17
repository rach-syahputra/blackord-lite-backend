const prisma = require('../db')

const userRepository = {
  async findAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        email: true,
        roleId: true,
        createdAt: true
      },
      orderBy: {
        username: 'asc'
      }
    })

    return users
  },

  async findUserByUsername(username) {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    return user
  },

  async findUserByRefreshToken(refreshToken) {
    const user = await prisma.user.findMany({
      where: {
        refreshToken
      }
    })

    return user
  },

  async createUser(userData) {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        roleId: userData.roleId,
        refreshToken: ''
      }
    })

    return user
  },

  async updateUserByUsername(username, userData) {
    const user = await prisma.user.update({
      where: {
        username
      },
      data: {
        email: userData.email,
        password: userData.password,
        refreshToken: userData.refreshToken
      }
    })

    return user
  },

  async deleteUserByUsername(username) {
    await prisma.user.delete({
      where: {
        username
      }
    })
  }
}

module.exports = userRepository
