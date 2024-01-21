'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'

export async function Classrooms() {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = ['instructor', 'administrator']

  if (!profileAuthorized.includes(profile)) return null

  const classrooms = await prisma.class.findMany()

  return classrooms
}
