const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const authRoutes = require('./auth/auth.route')
const userRoutes = require('./user/user.route')
const listenerRoutes = require('./listener/listener.route')
const artistRoutes = require('./artist/artist.route')
const albumController = require('./album/album.controller')
const songController = require('./song/song.controller')

const app = express()
app.use(express.json())
app.use(cookieParser())

dotenv.config()
const PORT = process.env.PORT

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/listeners', listenerRoutes)
app.use('/artists', artistRoutes)
app.use('/albums', albumController)
app.use('/songs', songController)

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})
