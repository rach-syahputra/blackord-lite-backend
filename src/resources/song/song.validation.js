const { z } = require('zod')

const AddSongSchema = z.object({
  albumId: z.string().min(1, 'Album ID is required'),
  title: z.string().min(1, 'Title is required'),
  duration: z.number().min(1, 'Duration is required')
})

module.exports = {
  AddSongSchema
}
