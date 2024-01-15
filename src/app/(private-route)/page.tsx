import SignOutForm from '@/components/auth/sign-out-form'
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
      {isInstructor && redirect('/instrutor')}

      <div className="flex flex-col items-center justify-center space-y-5">
        <b className="text-lg text-muted-foreground">
          O usuário logado não possui um perfil válido
        </b>
        <SignOutForm />
      </div>
    </>
  )
}
