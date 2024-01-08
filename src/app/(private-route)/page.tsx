import AdmHome from '@/modules/administrator/components/adm-home'
import AuthService from '@/modules/auth/services/auth-service'
import { cookies } from 'next/headers'

export default async function Home() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { name, profile } = await AuthService.openSessionToken(token.value)

  const isAdmin = profile === 'administrator'
  const isStudent = profile === 'student'
  const isParent = profile === 'parent'
  const isInstructor = profile === 'instructor'

  return (
    <>
      {isAdmin && <AdmHome name={name as string} profile={profile} />}
      {isStudent && <p>Implementar página de Estudantes</p>}
      {isParent && <p>Implementar página de Responsaveis</p>}
      {isInstructor && <p>Implementar página de Instrutores</p>}
    </>
  )
}
