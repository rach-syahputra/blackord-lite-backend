const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const authController = require('./auth/auth.controller')
const userController = require('./user/user.controller')
const listenerController = require('./listener/listener.controller')
const artistController = require('./artist/artist.controller')
const albumController = require('./album/album.controller')
const songController = require('./song/song.controller')

const app = express()
app.use(express.json())
app.use(cookieParser())

dotenv.config()
const PORT = process.env.PORT

app.use('/auth', authController)
app.use('/users', userController)
app.use('/listeners', listenerController)
app.use('/artists', artistController)
app.use('/albums', albumController)
app.use('/songs', songController)

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})
