const { z } = require('zod')

const AddArtistSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username should not exceed 20 characters'),
  artistName: z.string().min(1, 'Artist name is required'),
  image: z.string().min(1, 'Image is required'),
  bio: z.string().min(1, 'Bio is required')
})

const UpdateArtistSchema = AddArtistSchema.partial().omit({
  username: true,
  artistName: true
})

module.exports = {
  AddArtistSchema,
  UpdateArtistSchema
}
