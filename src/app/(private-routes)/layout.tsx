import { Navbar } from '@/components/common/navbar'
import { useSession } from '@/session'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await useSession()

  if (!user) redirect('/')

  return (
    <div>
      <Navbar user={user} />
      <div className="pb-20">{children}</div>
    </div>
  )
}
