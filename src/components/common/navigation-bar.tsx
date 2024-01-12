import { ReactNode } from 'react'

export const Navigation = {
  container: NavigationBar,
}

function NavigationBar({ children }: { children: ReactNode }) {
  return <nav className="mb-4 flex justify-end">{children}</nav>
}
