const prisma = require('../db')

const authRepository = {
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
      },
      select: {
        username: true,
        email: true,
        roleId: true,
        createdAt: true,
        refreshToken: true
      }
    })

    return user
  }
}

module.exports = authRepository
