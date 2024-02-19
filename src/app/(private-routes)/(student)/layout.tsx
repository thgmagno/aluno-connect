import { useSession } from '@/session'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function StudentLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await useSession()

  user.profile !== 'STUDENT' && redirect('/')

  return <>{children}</>
}
