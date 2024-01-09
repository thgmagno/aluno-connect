import AdmNavbar from '@/components/administrator/adm-navbar'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdministratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { name, profile } = await AuthService.openSessionToken(token.value)

  if (profile !== 'administrator') redirect('/')

  return (
    <>
      <AdmNavbar name={name as string} profile={profile} />
      <div className="container">{children}</div>
    </>
  )
}
