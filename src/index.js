const express = require('express')
const dotenv = require('dotenv')
const userController = require('./user/user.controller')
const listenerController = require('./listener/listener.controller')
const artistController = require('./artist/artist.controller')
const albumController = require('./album/album.controller')
// const songController = require('./song/song.controller')

const app = express()

dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

app.use('/users', userController)
app.use('/listeners', listenerController)
app.use('/artists', artistController)
app.use('/albums', albumController)
// app.use('/songs', songController)

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT)
})
