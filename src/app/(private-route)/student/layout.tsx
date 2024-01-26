import AuthService from '@/services/auth-service'
import React from 'react'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await AuthService.getUserProfile()

  if (profile !== 'student') return <p>Não autorizado</p>

  // TODO: Create Navbar
  return <React.Fragment>{children}</React.Fragment>
}
