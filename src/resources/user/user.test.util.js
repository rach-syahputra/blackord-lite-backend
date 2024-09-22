const prisma = require('../../utils/db')
const bcrypt = require('bcrypt')

const username = 'user-test'
const password = '12345678'
const email = 'user_test@example.com'
const updatedEmail = 'user_test_updated@example.com'
const listenerRoleId = 1

const userTest = {
  async createUser() {
    await prisma.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
        email,
        roleId: listenerRoleId
      }
    })
  },

  async getUserByUsername() {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) throw new Error('User not found')

    return user
  },

  async updateUser() {
    await prisma.user.update({
      where: {
        username
      },
      data: {
        email: updatedEmail
      }
    })
  },

  async deleteUser() {
    await prisma.user.delete({
      where: {
        username
      }
    })
  }
}

module.exports = userTest
