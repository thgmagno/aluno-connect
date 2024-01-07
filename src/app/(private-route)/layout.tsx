import AuthService from '@/modules/auth/services/auth-service'
import Header from '@/modules/common/components/header'
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
      <Header />
      {children}
    </>
  )
}
