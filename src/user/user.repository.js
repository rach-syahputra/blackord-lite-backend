const prisma = require('../db')

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  return user
}

const createUser = async (userData) => {
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      roleId: userData.roleId
    }
  })

  return user
}

const updateUserByUsername = async (username, userData) => {
  const user = await prisma.user.update({
    where: {
      username
    },
    data: {
      email: userData.email,
      password: userData.password
    }
  })

  return user
}

const deleteUserByUsername = async (username) => {
  await prisma.user.delete({
    where: {
      username
    }
  })
}

module.exports = {
  findUserByUsername,
  createUser,
  updateUserByUsername,
  deleteUserByUsername
}
