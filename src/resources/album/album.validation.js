const { z } = require('zod')

const AddAlbumSchema = z.object({
  artistUsername: z.string().min(1, 'Artist username is required'),
  title: z.string().min(1, 'Title is required'),
  genre: z.string().min(1, 'Genre is required'),
  image: z.string().min(1, 'Image is required')
})

module.exports = {
  AddAlbumSchema
}
