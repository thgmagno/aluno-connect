import { useSession } from '@/session'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function InstructorLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await useSession()

  user.profile !== 'INSTRUCTOR' && redirect('/')

  return <>{children}</>
}
