import { cache } from 'react'
import type { Student } from '@prisma/client'
import db from '@/db'

export const findManyStudents = cache((): Promise<Student[]> => {
  return db.student.findMany({
    orderBy: { name: 'asc' },
  })
})
