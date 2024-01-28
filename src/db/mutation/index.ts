import { createStudent } from './create-student'
import { deleteEntityByIdAndCategory } from './delete-entity'
import { resetUserPasswordByIdAndProfile } from './reset-user-password'

export const mutation = {
  createStudent,
  deleteEntityByIdAndCategory,
  resetUserPasswordByIdAndProfile,
}
