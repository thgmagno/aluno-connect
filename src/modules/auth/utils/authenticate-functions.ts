import {
  authenticateAdministrator,
  authenticateInstructor,
  authenticateParent,
  authenticateStudent,
} from '../actions/auth-actions'

export const authenticationFunctions = {
  instructor: authenticateInstructor,
  student: authenticateStudent,
  parent: authenticateParent,
  administrator: authenticateAdministrator,
}
