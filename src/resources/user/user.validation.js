const { z } = require('zod')

const AddUserSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username should not exceed 20 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email format is invalid'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  roleId: z.number().min(1, 'Role ID is required'),
  refreshToken: z.string().optional()
})

const UpdateUserSchema = AddUserSchema.partial().omit({ username: true })

module.exports = {
  AddUserSchema,
  UpdateUserSchema
}
