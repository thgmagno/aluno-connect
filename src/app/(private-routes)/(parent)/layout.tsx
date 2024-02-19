import { useSession } from '@/session'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function ParentLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await useSession()

  user.profile !== 'PARENT' && redirect('/')

  return <>{children}</>
}
