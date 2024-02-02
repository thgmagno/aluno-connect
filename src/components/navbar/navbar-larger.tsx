'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  options: {
    href: string
    name: string
  }[]
}

export default function NavbarLarger({ options }: Props) {
  const path = usePathname()

  return (
    <div className="flex gap-3">
      {options.map((op) => (
        <Link
          key={op.href}
          href={op.href}
          className={`text-lg ${
            path === op.href
              ? 'border-b border-neutral-400 text-neutral-200'
              : 'hover:text-neutral-200'
          }`}
        >
          {op.name}
        </Link>
      ))}
    </div>
  )
}
