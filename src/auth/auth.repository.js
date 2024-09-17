const prisma = require('../db')

const authRepository = {
  async findUserByRefreshToken(refreshToken) {
    const user = await prisma.user.findMany({
      where: {
        refreshToken
      }
    })

    return user
  }
}

module.exports = authRepository
