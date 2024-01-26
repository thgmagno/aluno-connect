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

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container flex-1 bg-gradient-to-t from-indigo-950 to-neutral-900 p-4 pb-12">
        {children}
      </div>
    </main>
  )
}
