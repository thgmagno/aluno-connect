import { useSession } from '@/session'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await useSession()

  user.profile !== 'ADMINISTRATOR' && redirect('/')

  return <>{children}</>
}
