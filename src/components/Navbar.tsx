import { ReactNode } from 'react'

export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <div className="absolute left-0 top-0 flex h-16 w-full flex-wrap items-center justify-between bg-teal-950 p-2">
      {children}
    </div>
  )
}
