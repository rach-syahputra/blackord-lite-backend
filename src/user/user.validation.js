const { z } = require('zod')

const AddUserSchema = z.object({
  username: z.string().max(20, 'Username should not exceed 20 characters'),
  email: z.string().email('Email format is invalid'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  roleId: z.number(),
  refreshToken: z.string().optional()
})

const UpdateUserSchema = AddUserSchema.partial().omit({ username: true })

module.exports = {
  AddUserSchema,
  UpdateUserSchema
}
