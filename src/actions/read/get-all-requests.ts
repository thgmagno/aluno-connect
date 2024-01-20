'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'

export async function getAllRequests() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return null
  const { profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'parent' && profile !== 'student') return null

  const request = await prisma.request.findMany()

  return request
}
