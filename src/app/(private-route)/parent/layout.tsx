import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import React from 'react'

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'parent') return <p>Não autorizado</p>

  return { children }
}
