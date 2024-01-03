import { Undo2 } from 'lucide-react'
import Link from 'next/link'

export default function BtnGoBack({ href }: { href: string }) {
  return (
    <Link href={href} className="flex gap-1.5 font-semibold text-zinc-100">
      <Undo2 />
      <span className="hidden md:flex">Voltar</span>
    </Link>
  )
}
