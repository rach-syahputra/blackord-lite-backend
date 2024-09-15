const {
  findUserByUsername,
  createUser,
  updateUserByUsername,
  deleteUserByUsername
} = require('./user.repository')

const getUser = async (username) => {
  const user = await findUserByUsername(username)

  if (!user) {
    throw Error('User not found')
  }

  return user
}

const addUser = async (userData) => {
  const user = await createUser(userData)

  return user
}

const updateUser = async (username, userData) => {
  const user = await updateUserByUsername(username, userData)

  return user
}

const deleteUser = async (username) => {
  await deleteUserByUsername(username)
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser
}
