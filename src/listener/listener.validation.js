const { z } = require('zod')

const AddListenerSchema = z.object({
  username: z.string().max(20, 'Username should not exceed 20 characters'),
  image: z.string().min(1, 'Image is required')
})

const UpdateListenerSchema = AddListenerSchema.partial().omit({
  username: true
})

module.exports = {
  AddListenerSchema,
  UpdateListenerSchema
}
