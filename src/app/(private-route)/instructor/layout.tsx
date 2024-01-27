import NavbarInstructor from '@/components/navbar/instructor'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { name, profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'instructor') return <p>Não autorizado</p>

  return (
    <div className="mx-auto space-y-3 md:max-w-[96%]">
      <NavbarInstructor name={name as string} />
      {children}
    </div>
  )
}
