const express = require('express')
const {
  getAlbumsFromArtist,
  getAlbum,
  addAlbum,
  deleteAlbum
} = require('./album.service')

const router = express.Router()

router.get('/artists/:username', async (req, res) => {
  try {
    const artistUsername = req.params.username
    const albums = await getAlbumsFromArtist(artistUsername)

    res.status(200).json({
      message: 'Albums from artist successfully retrieved',
      data: albums
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const album = await getAlbum(id)

    res.status(200).json({
      message: 'Album successfully retrieved',
      data: album
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const albumData = req.body

    const album = await addAlbum(albumData)

    res.status(201).json({
      message: 'Album added successfully',
      data: album
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    await deleteAlbum(id)

    res.status(200).json({
      message: 'Album deleted successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router
