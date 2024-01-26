'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'

export async function Frequencies() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return null
  const { sub, profile } = await AuthService.openSessionToken(token.value)

  if (profile === 'student') {
    const frequency = await prisma.frequency.findMany({
      where: { studentId: sub },
    })
    return frequency
  }

  if (profile === 'parent') {
    const relation = await prisma.studentParent.findMany({
      where: { parentId: sub },
      select: { studentId: true },
    })

    const arrStudents = relation.reduce(
      (accumulator: string[], currentValue) => {
        accumulator.push(currentValue.studentId)
        return accumulator
      },
      [],
    )

    const frequency = await prisma.frequency.findMany({
      where: { studentId: { in: arrStudents } },
    })
    return frequency
  }

  return null
}
