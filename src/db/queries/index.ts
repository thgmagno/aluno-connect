import { findManyClasses } from './classroom/findManyClasses'
import { findFrequencyByStudentId } from './frequency/findFrequencyByStudentId'
import { findManyInstructors } from './instructor/findManyInstructors'
import { findManyParents } from './parent/findManyParents'
import { findManyRequests } from './request/findManyRequests'
import { findManyStudents } from './student/findManyStudents'

export const queries = {
  classroom: { findManyClasses },
  frequency: { findFrequencyByStudentId },
  instructor: { findManyInstructors },
  parent: { findManyParents },
  request: { findManyRequests },
  student: { findManyStudents },
}
