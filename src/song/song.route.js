const express = require('express')
const songController = require('./song.controller')
const { verifyToken } = require('../middleware/verification')

const router = express.Router()

router.get('/albums/:albumId', songController.getSongsFromAlbum)
router.get('/:id', songController.getSong)
router.post('/', verifyToken, songController.addSong)
router.delete('/:id', verifyToken, songController.deleteSong)

module.exports = router
