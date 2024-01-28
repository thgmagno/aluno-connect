import { cache } from 'react'
import type { Student } from '@prisma/client'
import db from '@/db'
import { cookies } from 'next/headers'
import AuthService from '@/services/auth-service'

export const findStudentsForParents = cache(async (): Promise<Student[]> => {
  const token = cookies().get('session-aluno-connect')
  const { sub } = await AuthService.openSessionToken(token?.value ?? '')

  const studentsIdData = await db.studentParent.findMany({
    where: { parentId: sub },
    select: { studentId: true },
  })

  const studentsId = studentsIdData.map((data) => data.studentId.toString())

  return db.student.findMany({
    where: { id: { in: studentsId } },
  })
})
