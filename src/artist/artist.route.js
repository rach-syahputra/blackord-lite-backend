const express = require('express')
const artistController = require('./artist.controller')
const { verifyToken, verifyArtist } = require('../middleware/verification')

const router = express.Router()

router.get('/', verifyToken, verifyArtist, artistController.getAllArtists)
router.get('/:username', verifyToken, artistController.getArtist)
router.post('/', artistController.addArtist)
router.put(
  '/:username',
  verifyToken,
  verifyArtist,
  artistController.updateArtist
)

module.exports = router
