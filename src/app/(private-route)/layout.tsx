import AuthService from '@/modules/auth/services/auth-service'
import UserAvatar from '@/modules/common/components/user-avatar'
import { redirect } from 'next/navigation'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await AuthService.isSessionValid()
  if (!session) return redirect('/entrar')

  return (
    <>
      <UserAvatar /> {children}
    </>
  )
}
