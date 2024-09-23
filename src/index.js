const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { ResponseError } = require('./utils/error/response-error')
const { ZodError } = require('zod')

const authRoutes = require('./resources/auth/auth.route')
const userRoutes = require('./resources/user/user.route')
const listenerRoutes = require('./resources/listener/listener.route')
const artistRoutes = require('./resources/artist/artist.route')
const albumRoutes = require('./resources/album/album.route')
const songRoutes = require('./resources/song/song.route')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/listeners', listenerRoutes)
app.use('/artists', artistRoutes)
app.use('/albums', albumRoutes)
app.use('/songs', songRoutes)

// ERROR MIDDLEWARE
app.use((error, req, res, next) => {
  if (!error) {
    next()
    return
  }

  if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: error.message
    })
  } else if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        [error.issues[0].path]: error.issues[0].message
      }
    })
  } else {
    res.status(500).json({
      error: error.message
    })
  }
})

module.exports = app
