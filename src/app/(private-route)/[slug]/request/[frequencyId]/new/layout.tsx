import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function NewRequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await AuthService.getUserProfile()

  const profileAuthorized = ['student', 'parent']
  if (!profileAuthorized.includes(profile)) return redirect('/')

  return <>{children}</>
}
