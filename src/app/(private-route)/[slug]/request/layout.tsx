import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function RequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = ['student', 'parent', 'administrator']
  if (!profileAuthorized.includes(profile)) return redirect('/')

  return <>{children}</>
}
