// Classrooms
import { findManyClasses } from './classroom/findManyClasses'
import { findClassesForInstructors } from './classroom/findClassesForInstructors'

// Frequencies
import { findFrequencyByStudentId } from './frequency/findFrequencyByStudentId'

// Instructors
import { findManyInstructors } from './instructor/findManyInstructors'

// Parents
import { findManyParents } from './parent/findManyParents'

// Requests
import { findManyRequests } from './request/findManyRequests'

// Students
import { findManyStudents } from './student/findManyStudents'
import { findStudentsForParents } from './student/findStudentsForParents'

export const queries = {
  classroom: { findManyClasses, findClassesForInstructors },
  frequency: { findFrequencyByStudentId },
  instructor: { findManyInstructors },
  parent: { findManyParents },
  request: { findManyRequests },
  student: { findManyStudents, findStudentsForParents },
}
