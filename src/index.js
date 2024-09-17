const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

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

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})
