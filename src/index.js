const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { ResponseError } = require('./error/response-error')
const { ZodError } = require('zod')

const authRoutes = require('./auth/auth.route')
const userRoutes = require('./user/user.route')
const listenerRoutes = require('./listener/listener.route')
const artistRoutes = require('./artist/artist.route')
const albumRoutes = require('./album/album.route')
const songRoutes = require('./song/song.route')

const app = express()
app.use(express.json())
app.use(cookieParser())

dotenv.config()
const PORT = process.env.PORT

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

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})
