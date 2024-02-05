import { upsertStudent } from './upsert-student'
import { upsertParent } from './upsert-parent'
import { upsertInstructor } from './upsert-instructor'
import { upsertClassroom } from './upsert-classroom'
import { deleteEntityByIdAndCategory } from './delete-entity'
import { resetUserPasswordByIdAndProfile } from './reset-user-password'
import { newFrequency } from './new-frequency'

export const mutation = {
  upsertStudent,
  upsertParent,
  upsertInstructor,
  upsertClassroom,
  deleteEntityByIdAndCategory,
  resetUserPasswordByIdAndProfile,
  newFrequency,
}
