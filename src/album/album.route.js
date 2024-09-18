const express = require('express')
const albumController = require('./album.controller')
const { verifyToken } = require('../middleware/verification')

const router = express.Router()

router.get('/artists/:username', albumController.getAlbumsFromArtist)
router.get('/:id', albumController.getAlbum)
router.post('/', verifyToken, albumController.addAlbum)
router.delete('/:id', verifyToken, albumController.deleteAlbum)

module.exports = router
