import paths from '@/paths'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LinkStudentToClassLayout({
  params,
  children,
}: {
  params: { slug: string }
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) return redirect(paths.signInPath())
  const { profile } = await AuthService.openSessionToken(token.value)
  if (profile !== params.slug || profile !== 'administrator')
    return redirect('/')

  return <>{children}</>
}
