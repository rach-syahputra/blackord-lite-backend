const {
  findListenerByUsername,
  createListener,
  updateListenerByUsername
} = require('./listener.repository')

const getListener = async (username) => {
  const listener = await findListenerByUsername(username)

  if (!listener) {
    throw Error('Listener not found')
  }

  return listener
}

const addListener = async (listenerData) => {
  const listener = await createListener(listenerData)

  return listener
}

const updateListener = async (username, listenerData) => {
  const listener = await updateListenerByUsername(username, listenerData)

  return listener
}

module.exports = {
  getListener,
  addListener,
  updateListener
}
