const express = require('express')
const {
  getListener,
  addListener,
  updateListener
} = require('./listener.service')

const router = express.Router()

router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const listener = await getListener(username)

    res.status(200).json({
      message: 'Listener successfully retrieved',
      data: listener
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const listenerData = req.body

    const listener = await addListener(listenerData)

    res.status(201).json({
      message: 'Listener added successfully',
      data: listener
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
    const listenerData = req.body

    const listener = await updateListener(username, listenerData)

    res.status(200).json({
      message: 'Listener updated successfully',
      data: listener
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router
