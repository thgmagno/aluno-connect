'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'

export async function Requests() {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = ['student', 'administrator', 'parent']

  if (!profileAuthorized.includes(profile)) return null

  const request = await prisma.request.findMany({
    include: { frequencyID: true },
  })

  return request
}
