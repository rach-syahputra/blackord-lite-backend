const express = require('express')
const { verifyToken } = require('../../middleware/verification')
const listenerController = require('./listener.controller')
const listenerArtistController = require('../relationship/listener-artist/listener-artist.controller')

const router = express.Router()

router.get('/:username', verifyToken, listenerController.getListener)
router.post('/', listenerController.addListener)
router.put('/:username', verifyToken, listenerController.updateListener)

router.get(
  '/:username/favorite-artists',
  listenerArtistController.getAllFavoriteArtistsFromListener
)

module.exports = router