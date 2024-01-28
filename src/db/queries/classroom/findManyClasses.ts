import db from '@/db'
import { cache } from 'react'
import type { Classroom } from '@prisma/client'

export const findManyClasses = cache((): Promise<Classroom[]> => {
  return db.classroom.findMany({
    orderBy: { course_name: 'asc' },
  })
})
