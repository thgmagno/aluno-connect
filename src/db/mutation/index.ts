import { upsertStudent } from './upsert-student'
import { upsertParent } from './upsert-parent'
import { deleteEntityByIdAndCategory } from './delete-entity'
import { resetUserPasswordByIdAndProfile } from './reset-user-password'

export const mutation = {
  upsertStudent,
  upsertParent,
  deleteEntityByIdAndCategory,
  resetUserPasswordByIdAndProfile,
}
