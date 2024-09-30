const prisma = require('../../utils/db')

const userRepository = {
  async findAll() {
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

  async find(username) {
    const user = await prisma.user.findUnique({
      where: {
        username
      },
      select: {
        username: true,
        email: true,
        roleId: true,
        createdAt: true
      }
    })

    return user
  },

  async create(userData) {
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

  async update(username, userData) {
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

  async delete(username) {
    await prisma.user.delete({
      where: {
        username
      }
    })
  }
}

module.exports = userRepository
