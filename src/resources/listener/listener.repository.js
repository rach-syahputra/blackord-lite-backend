const prisma = require('../../utils/db')

const listenerRepository = {
  async findListenerByUsername(username) {
    const listener = await prisma.listener.findUnique({
      where: {
        username
      }
    })

    return listener
  },

  async createListener(listenerData) {
    const listener = await prisma.listener.create({
      data: {
        username: listenerData.username,
        image: listenerData.image
      }
    })

    return listener
  },

  async updateListenerByUsername(username, listenerData) {
    const listener = await prisma.listener.update({
      where: {
        username
      },
      data: {
        image: listenerData.image
      }
    })

    return listener
  }
}

module.exports = listenerRepository
