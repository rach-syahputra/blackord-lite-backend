const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const MAX_LISTENER_IMAGE_SIZE = 2000000 // 2mb
const MAX_ARTIST_IMAGE_SIZE = 5000000 // 5mb
const MAX_ALBUM_IMAGE_SIZE = 5000000 // 5mb

module.exports = {
  imageFilter,
  MAX_LISTENER_IMAGE_SIZE,
  MAX_ARTIST_IMAGE_SIZE,
  MAX_ALBUM_IMAGE_SIZE
}
