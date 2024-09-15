const express = require('express')
const {
  getArtist,
  addArtist,
  updateArtist,
  getAllArtists
} = require('./artist.service')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const artists = await getAllArtists()

    res.status(200).json({
      message: 'Artists successfully retrieved',
      data: artists
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
    const artist = await getArtist(username)

    res.status(200).json({
      message: 'Artist successfully retrieved',
      data: artist
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const artistData = req.body

    const artist = await addArtist(artistData)

    res.status(201).json({
      message: 'Artist added successfully',
      data: artist
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
    const artistData = req.body

    const artist = await updateArtist(username, artistData)

    res.status(200).json({
      message: 'Artist updated successfully',
      data: artist
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router
