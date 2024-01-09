import AuthService from '@/modules/auth/services/auth-service'
import StudentNavbar from '@/modules/student/components/student-navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { name, profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'student') redirect('/')

  return (
    <>
      <StudentNavbar name={name as string} profile={profile} />
      <div className="container">{children}</div>
    </>
  )
}
