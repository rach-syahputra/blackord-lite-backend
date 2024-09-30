const express = require('express')
const { verifyToken } = require('../../middleware/verification')
const listenerController = require('./listener.controller')
const listenerArtistController = require('../relationship/listener-artist/listener-artist.controller')
const { uploadListenerImage } = require('../../utils/multer')

const router = express.Router()

router.get('/:username', listenerController.get)
router.post('/', uploadListenerImage.single('image'), listenerController.add)
router.put(
  '/:username',
  verifyToken,
  uploadListenerImage.single('image'),
  listenerController.update
)

router.get(
  '/:username/favorite-artists',
  listenerArtistController.getFavoriteArtistsFromListener
)
router.get(
  '/:username/favorite-artists/:artistUsername',
  listenerArtistController.get
)

module.exports = router
