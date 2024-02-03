// Classrooms
import { findManyClasses } from './classroom/findManyClasses'
import { findClassesForInstructors } from './classroom/findClassesForInstructors'
import { findClassById } from './classroom/findClassById'

// Frequencies
import { findFrequencyByStudentId } from './frequency/findFrequencyByStudentId'
import { findLast30ByStudentIdAndClassId } from './frequency/findLast30ByStudentIdAndClassId'

// Instructors
import { findManyInstructors } from './instructor/findManyInstructors'

// Parents
import { findManyParents } from './parent/findManyParents'

// Requests
import { findManyRequests } from './request/findManyRequests'

// Students
import { findManyStudents } from './student/findManyStudents'
import { findStudentsForParents } from './student/findStudentsForParents'
import { findStudentsForClass } from './student/findStudentsForClass'
import { findStudentById } from './student/findStudentById'

export const queries = {
  classroom: { findManyClasses, findClassesForInstructors, findClassById },
  frequency: { findFrequencyByStudentId, findLast30ByStudentIdAndClassId },
  instructor: { findManyInstructors },
  parent: { findManyParents },
  request: { findManyRequests },
  student: {
    findManyStudents,
    findStudentsForParents,
    findStudentsForClass,
    findStudentById,
  },
}
