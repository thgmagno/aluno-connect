import { NavbarAdministrator } from '@/components/administrator'
import AuthService from '@/services/auth-service'

export default async function AdministratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await AuthService.getUserProfile()

  if (profile !== 'administrator') return <p>Não autorizado</p>

  return (
    <>
      <NavbarAdministrator />
      {children}
    </>
  )
}
