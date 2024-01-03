import { ReactNode } from 'react'

export default function ContentMain({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      {children}
    </main>
  )
}
