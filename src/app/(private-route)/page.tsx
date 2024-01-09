import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { profile } = await AuthService.openSessionToken(token.value)

  const isAdmin = profile === 'administrator'
  const isStudent = profile === 'student'
  const isParent = profile === 'parent'
  const isInstructor = profile === 'instructor'

  return (
    <>
      {isAdmin && redirect('/administrador')}
      {isStudent && redirect('/aluno')}
      {isParent && <p>Implementar página de Responsaveis</p>}
      {isInstructor && <p>Implementar página de Instrutores</p>}
    </>
  )
}
