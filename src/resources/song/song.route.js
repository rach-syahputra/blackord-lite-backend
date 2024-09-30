const express = require('express')
const songController = require('./song.controller')
const { verifyToken } = require('../../middleware/verification')

const router = express.Router()

router.get('/albums/:albumId', songController.getFromAlbum)
router.get('/:id', songController.get)
router.post('/', verifyToken, songController.add)
router.delete('/:id', verifyToken, songController.delete)

module.exports = router
