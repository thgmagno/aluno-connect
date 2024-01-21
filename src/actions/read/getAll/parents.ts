'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'

export async function Parents() {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = 'administrator'

  if (!profileAuthorized.includes(profile)) return null

  const parents = await prisma.parent.findMany()

  return parents
}
