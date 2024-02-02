import { Navbar } from '@/components/navbar'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isSessionValid = await AuthService.isSessionValid()
  if (!isSessionValid) return redirect(paths.signInPath())

  const profile = await AuthService.getUserProfile()

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar profile={profile} />
      <div className="container flex-1 bg-gradient-to-t from-indigo-950 to-neutral-900 p-4 pb-20">
        {children}
      </div>
    </main>
  )
}
