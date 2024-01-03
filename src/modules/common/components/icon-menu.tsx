import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function IconMenu({
  href,
  title,
  icon,
}: {
  href: string
  title: string
  icon: ReactNode
}) {
  return (
    <Link href={href} className="iconMenu">
      <Button
        variant={'outline'}
        className="flex h-20 w-full flex-col gap-2 bg-zinc-200 transition-all duration-300 hover:scale-105 hover:bg-zinc-50 hover:shadow-md"
      >
        {icon}
        {title}
      </Button>
    </Link>
  )
}
