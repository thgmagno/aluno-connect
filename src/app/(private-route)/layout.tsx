import paths from '@/paths'
import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await AuthService.isSessionValid()
  if (!session) return redirect(paths.signInPath())

  return <>{children}</>
}
