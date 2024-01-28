import { cache } from 'react'
import type { Parent } from '@prisma/client'
import db from '@/db'

export const findManyParents = cache((): Promise<Parent[]> => {
  return db.parent.findMany({
    orderBy: { name: 'asc' },
  })
})
