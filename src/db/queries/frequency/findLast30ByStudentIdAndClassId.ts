import { cache } from 'react'
import db from '@/db'
import { Frequency } from '@prisma/client'

export const findLast30ByStudentIdAndClassId = cache(
  (studentId: string, classId: string): Promise<Frequency[]> => {
    return db.frequency.findMany({
      where: { studentID: { id: studentId }, classID: { id: classId } },
      take: 30,
      orderBy: { date: 'desc' },
    })
  },
)
