import { upsertStudent } from './upsert-student'
import { upsertParent } from './upsert-parent'
import { upsertInstructor } from './upsert-instructor'
import { upsertClassroom } from './upsert-classroom'
import { deleteEntityByIdAndCategory } from './delete-entity'
import { resetUserPasswordByIdAndProfile } from './reset-user-password'

export const mutation = {
  upsertStudent,
  upsertParent,
  upsertInstructor,
  upsertClassroom,
  deleteEntityByIdAndCategory,
  resetUserPasswordByIdAndProfile,
}
