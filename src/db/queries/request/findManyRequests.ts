import { cache } from 'react'
import type { Frequency, Request, Student } from '@prisma/client'
import db from '@/db'

interface RequestWithDetails extends Request {
  frequencyID: Frequency
  studentID: Student
}

export const findManyRequests = cache((): Promise<RequestWithDetails[]> => {
  return db.request.findMany({
    include: { frequencyID: true, studentID: true },
    orderBy: { frequencyID: { date: 'desc' } },
  })
})
