const express = require('express')
const {
  getSongsFromAlbum,
  getSong,
  addSong,
  deleteSong
} = require('./song.service')

const router = express.Router()

router.get('/albums/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId
    const songs = await getSongsFromAlbum(albumId)

    res.status(200).json({
      message: 'Songs from album successfully retrieved',
      data: songs
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
    const song = await getSong(id)

    res.status(200).json({
      message: 'Song successfully retrieved',
      data: song
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const songData = req.body

    const song = await addSong(songData)

    res.status(201).json({
      message: 'Song added successfully',
      data: song
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

    await deleteSong(id)

    res.status(200).json({
      message: 'Song deleted successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

module.exports = router
