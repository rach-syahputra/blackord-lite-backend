const {
  findUserByUsername,
  createUser,
  updateUserByUsername,
  deleteUserByUsername,
  findAllUsers
} = require('./user.repository')
const bcrypt = require('bcrypt')

const getAllUsers = async () => {
  const users = await findAllUsers()

  return users
}

const getUser = async (username) => {
  const user = await findUserByUsername(username)

  if (!user) {
    throw Error('User not found')
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...other } = user

  return other
}

const addUser = async (userData) => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(userData.password, salt)

  userData.password = hashedPassword

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
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
}
