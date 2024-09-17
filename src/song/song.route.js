const express = require('express')
const songController = require('./song.controller')

const router = express.Router()

router.get('/albums/:albumId', songController.getSongsFromAlbum)
router.get('/:id', songController.getSong)
router.post('/', songController.addSong)
router.delete('/:id', songController.deleteSong)

module.exports = router
