import InstructorNavbar from '@/components/instructor/instructor-navbar'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { name, profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'instructor') redirect('/')

  return (
    <>
      <InstructorNavbar name={name as string} />
      {children}
    </>
  )
}
