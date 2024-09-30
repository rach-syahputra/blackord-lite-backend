const express = require('express')
const artistController = require('./artist.controller')
const { verifyToken } = require('../../middleware/verification')
const listenerArtistController = require('../relationship/listener-artist/listener-artist.controller')
const { uploadArtistImage } = require('../../utils/multer')

const router = express.Router()

router.get('/', artistController.getAll)
router.get('/:username', artistController.get)
router.post('/', uploadArtistImage.single('image'), artistController.add)
router.put(
  '/:username',
  verifyToken,
  uploadArtistImage.single('image'),
  artistController.update
)

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
