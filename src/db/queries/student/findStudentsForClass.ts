import { cache } from 'react'
import type { Student } from '@prisma/client'
import db from '@/db'

export const findStudentsForClass = cache(
  async (classId: string): Promise<Student[]> => {
    const students = await db.studentClass.findMany({
      where: { classId },
      select: { studentID: true },
      orderBy: { studentID: { name: 'asc' } },
    })

    const reducedStudents = students.map((student) => student.studentID)

    return reducedStudents
  },
)
