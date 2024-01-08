import AdmHome from '@/modules/administrator/components/adm-home'
import AuthService from '@/modules/auth/services/auth-service'
import StudentHome from '@/modules/student/components/student-home'
import StudentLayout from '@/modules/student/components/student-layout'
import { cookies } from 'next/headers'

export default async function Home() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { sub, name, profile } = await AuthService.openSessionToken(token.value)

  const isAdmin = profile === 'administrator'
  const isStudent = profile === 'student'
  const isParent = profile === 'parent'
  const isInstructor = profile === 'instructor'

  return (
    <>
      {isAdmin && (
        <AdmHome id={sub as string} name={name as string} profile={profile} />
      )}
      {isStudent && (
        <StudentLayout name={name as string} profile={profile}>
          <StudentHome id={sub as string} />
        </StudentLayout>
      )}
      {isParent && <p>Implementar página de Responsaveis</p>}
      {isInstructor && <p>Implementar página de Instrutores</p>}
    </>
  )
}
