const express = require('express')
const artistController = require('./artist.controller')
const { verifyToken } = require('../../middleware/verification')
const listenerArtistController = require('../relationship/listener-artist/listener-artist.controller')

const router = express.Router()

router.get('/', verifyToken, artistController.getAllArtists)
router.get('/:username', verifyToken, artistController.getArtist)
router.post('/', artistController.addArtist)
router.put('/:username', verifyToken, artistController.updateArtist)

router.get(
  '/:username/followers',
  listenerArtistController.getAllFollowersFromArtist
)
router.post(
  '/:username/follow',
  verifyToken,
  listenerArtistController.addFollowedArtist
)
router.post(
  '/:username/unfollow',
  verifyToken,
  listenerArtistController.deleteFollowedArtist
)

module.exports = router
