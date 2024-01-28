'use server'

import db from '@/db'
import { CategoryType } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function resetUserPasswordByIdAndProfile(
  id: string,
  category: CategoryType,
) {
  const map = {
    instructor: db.instructor.update({
      where: { id },
      data: { firstAccess: true, password: null },
    }),
    student: db.student.update({
      where: { id },
      data: { firstAccess: true, password: null },
    }),
    parent: db.parent.update({
      where: { id },
      data: { firstAccess: true, password: null },
    }),
    classroom: null,
  }

  revalidatePath(`/administrator/${category}s`)
  return map[category]
}
