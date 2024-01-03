import AuthService from '@/modules/auth/services/auth-service'
import NotAuthorized from '@/modules/common/components/not-authorized'
import { cookies } from 'next/headers'

export default async function AdministratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'administrator') return <NotAuthorized />

  return <>{children}</>
}
