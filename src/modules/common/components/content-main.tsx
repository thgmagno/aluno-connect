import { ReactNode } from 'react'

export default function ContentMain({ children }: { children: ReactNode }) {
  return (
    <main
      className="flex flex-col items-center pb-10"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {children}
    </main>
  )
}
