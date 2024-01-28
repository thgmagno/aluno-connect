import { NavbarStudent } from '@/components/student'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { name, profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'student') return <p>Não autorizado</p>

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <NavbarStudent name={name as string} />
      {children}
    </div>
  )
}
