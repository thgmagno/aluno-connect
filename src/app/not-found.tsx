import { ArrowUpRight, ScreenShareOff } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-3 text-neutral-300">
      <ScreenShareOff size={40} />
      <h1 className="text-center text-xl font-medium text-neutral-300">
        Ops... Parece que esta rota não faz parte da aplicação
      </h1>
      <Link href="/" className="flex border-b text-sky-600">
        Voltar para área segura
        <ArrowUpRight className="ml-1 w-5" />
      </Link>
    </div>
  )
}
