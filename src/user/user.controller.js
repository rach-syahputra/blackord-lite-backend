const express = require('express')
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getAllUsers
} = require('./user.service')
const { verifyToken } = require('../middleware/verifyToken')

const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await getAllUsers()

    res.status(200).json({
      message: 'Users successfully retrieved',
      data: users
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const user = await getUser(username)

    res.status(200).json({
      message: 'User successfully retrieved',
      data: user
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const userData = req.body

    const user = await addUser(userData)

    res.status(201).json({
      message: 'User added successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

router.put('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const userData = req.body

    const user = await updateUser(username, userData)

    res.status(200).json({
      message: 'User updated successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

router.delete('/:username', async (req, res) => {
  try {
    const username = req.params.username

    await deleteUser(username)

    res.status(200).json({
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router
