const prisma = require('../db')

const findListenerByUsername = async (username) => {
  const listener = await prisma.listener.findUnique({
    where: {
      username
    }
  })

  return listener
}

const createListener = async (listenerData) => {
  const listener = await prisma.listener.create({
    data: {
      username: listenerData.username,
      image: listenerData.image
    }
  })

  return listener
}

const updateListenerByUsername = async (username, listenerData) => {
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

module.exports = {
  findListenerByUsername,
  createListener,
  updateListenerByUsername
}
