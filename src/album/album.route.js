const express = require('express')
const albumController = require('./album.controller')
const { verifyToken } = require('../middleware/verifyToken')

const router = express.Router()

router.get(
  '/artists/:username',
  verifyToken,
  albumController.getAlbumsFromArtist
)
router.get('/:id', verifyToken, albumController.getAlbum)
router.post('/', verifyToken, albumController.addAlbum)
router.delete('/:id', verifyToken, albumController.deleteAlbum)

module.exports = router
