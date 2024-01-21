'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'

export async function Students() {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = ['parent', 'instructor', 'administrator']

  if (!profileAuthorized.includes(profile)) return null

  const students = await prisma.student.findMany()

  return students
}
