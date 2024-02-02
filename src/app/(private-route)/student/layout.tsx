import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'student') return <p>Não autorizado</p>

  return <>{children}</>
}
