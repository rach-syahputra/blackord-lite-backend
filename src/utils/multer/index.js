const multer = require('multer')
const { imageFilter, MAX_FILE_SIZE } = require('./filter')

const listenerImageStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const uploadListenerImage = multer({
  storage: listenerImageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
})

module.exports = { uploadListenerImage }
