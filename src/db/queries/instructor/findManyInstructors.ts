import { cache } from 'react'
import type { Instructor } from '@prisma/client'
import db from '@/db'

export const findManyInstructors = cache((): Promise<Instructor[]> => {
  return db.instructor.findMany({
    orderBy: { name: 'asc' },
  })
})
