'use server'

import db from '@/db'
import { CategoryType } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function deleteEntityByIdAndCategory(
  id: string,
  category: CategoryType,
) {
  const map = {
    instructor: db.instructor.delete({ where: { id } }),
    student: db.student.delete({ where: { id } }),
    parent: db.parent.delete({ where: { id } }),
    classroom: db.classroom.delete({ where: { id } }),
  }

  try {
    revalidatePath(`/administrator/${category}s`)
    return map[category]
  } catch (e) {
    console.log(e)
  }
}
