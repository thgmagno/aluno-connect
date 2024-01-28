import { cache } from 'react'
import type { Classroom } from '@prisma/client'
import db from '@/db'
import { cookies } from 'next/headers'
import AuthService from '@/services/auth-service'

export const findClassesForInstructors = cache(
  async (): Promise<Classroom[]> => {
    const token = cookies().get('session-aluno-connect')
    const { sub } = await AuthService.openSessionToken(token?.value ?? '')

    const classesIdData = await db.instructorClass.findMany({
      where: { instructorId: sub },
      select: { classId: true },
    })

    const classesId = classesIdData.map((data) => data.classId.toString())

    return db.classroom.findMany({
      where: { id: { in: classesId } },
    })
  },
)
