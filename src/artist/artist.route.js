const express = require('express')
const artistController = require('./artist.controller')
const { verifyToken } = require('../middleware/verification')

const router = express.Router()

router.get('/', verifyToken, artistController.getAllArtists)
router.get('/:username', verifyToken, artistController.getArtist)
router.post('/', artistController.addArtist)
router.put('/:username', verifyToken, artistController.updateArtist)

module.exports = router
