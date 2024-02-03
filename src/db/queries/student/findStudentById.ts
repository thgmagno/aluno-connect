import { cache } from 'react'
import type { Student } from '@prisma/client'
import db from '@/db'

export const findStudentById = cache((studentId: string): Promise<Student> => {
  return db.student.findUniqueOrThrow({
    where: { id: studentId },
  })
})
