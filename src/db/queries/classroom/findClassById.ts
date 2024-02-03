import { cache } from 'react'
import type { Classroom } from '@prisma/client'
import db from '@/db'

export const findClassById = cache((classId: string): Promise<Classroom> => {
  return db.classroom.findUniqueOrThrow({
    where: { id: classId },
  })
})
