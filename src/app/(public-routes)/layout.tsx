import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  const token = cookies().get('session-aluno-connect')
  if (token) redirect('/')

  return <>{children}</>
}
