import { ReactNode } from 'react'
import StudentNavbar from './student-navbar'

export default function StudentLayout({
  name,
  profile,
  children,
}: {
  name: string
  profile: string
  children: ReactNode
}) {
  return (
    <div>
      <StudentNavbar name={name} profile={profile} />
      {children}
    </div>
  )
}
