const express = require('express')
const albumController = require('./album.controller')
const { verifyToken } = require('../../middleware/verification')
const { uploadAlbumImage } = require('../../utils/multer')

const router = express.Router()

router.get('/artists/:username', albumController.getFromArtist)
router.get('/:id', albumController.get)
router.post(
  '/',
  verifyToken,
  uploadAlbumImage.single('image'),
  albumController.add
)
router.delete('/:id', verifyToken, albumController.delete)

module.exports = router
