const multer = require('multer')
const {
  imageFilter,
  MAX_LISTENER_IMAGE_SIZE,
  MAX_ARTIST_IMAGE_SIZE
} = require('./filter')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const uploadListenerImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: MAX_LISTENER_IMAGE_SIZE
  }
})

const uploadArtistImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: MAX_ARTIST_IMAGE_SIZE
  }
})

module.exports = { uploadListenerImage, uploadArtistImage }
