import NavbarParent from '@/components/navbar/parent'
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
  const { name, profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'parent') return <p>Não autorizado</p>

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <NavbarParent name={name as string} />
      {children}
    </div>
  )
}
