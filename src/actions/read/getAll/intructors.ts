'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'

export async function Instructors() {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = 'administrator'

  if (!profileAuthorized.includes(profile)) return null

  const instructors = await prisma.instructor.findMany()

  return instructors
}
