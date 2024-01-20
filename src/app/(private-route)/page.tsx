import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthService from '@/services/auth-service'
import paths from '@/paths'

export default async function Home() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return redirect(paths.signInPath())

  const { profile } = await AuthService.openSessionToken(token.value)

  const isAdmin = profile === 'administrator'
  const isStudent = profile === 'student'
  const isParent = profile === 'parent'
  const isInstructor = profile === 'instructor'

  isAdmin && redirect(paths.homeAdministratorPath(profile))
  isStudent && redirect(paths.homeStudentPath(profile))
  isParent && redirect(paths.homeParentPath(profile))
  isInstructor && redirect(paths.homeInstructorPath(profile))

  return (
    <div>
      <h1>Bem vindo ao Aluno Connect!</h1>
    </div>
  )
}
