import Unauthorized from '@/components/common/unauthorized'
import AuthService from '@/services/auth-service'

export default async function AdministratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await AuthService.getUserProfile()

  if (profile !== 'administrator') return <Unauthorized />

  return <>{children}</>
}
