import { ReactNode } from 'react'

export function Content({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <div className="table w-full rounded bg-zinc-200 text-center shadow-lg">
        {children}
      </div>
    </div>
  )
}

export function Header({ children }: { children: ReactNode }) {
  return (
    <div className="table-header-group">
      <div className="table-row font-semibold">{children}</div>
    </div>
  )
}

export function Cell({ children }: { children: ReactNode }) {
  return <div className="table-cell min-w-32 py-2">{children}</div>
}

export function Body({ children }: { children: ReactNode }) {
  return <div className="table-row-group">{children}</div>
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="table-row hover:bg-zinc-300">{children}</div>
}
