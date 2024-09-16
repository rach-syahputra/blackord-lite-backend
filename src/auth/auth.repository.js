const prisma = require('../db')

const findUserByRefreshToken = async (refreshToken) => {
  const user = await prisma.user.findMany({
    where: {
      refreshToken
    }
  })

  return user
}

module.exports = {
  findUserByRefreshToken
}
