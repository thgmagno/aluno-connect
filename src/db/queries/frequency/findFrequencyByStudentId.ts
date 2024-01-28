import { cache } from 'react'
import { Frequency, Classroom, Student } from '@prisma/client'
import db from '@/db'

interface Props extends Frequency {
  classID: Classroom
  studentID: Student
}

export const findFrequencyByStudentId = cache(
  (studentId: string): Promise<Props[]> => {
    return db.frequency.findMany({
      where: { studentID: { id: studentId } },
      include: { classID: true, studentID: true },
      orderBy: { date: 'desc' },
    })
  },
)
