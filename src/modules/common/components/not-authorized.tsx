import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function NotAuthorized() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center rounded-md bg-slate-300 p-5 shadow-lg">
        <ShieldAlert strokeWidth={1.5} className="mr-3" size={32} />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Não autorizado</h1>
          <span>O usuário logado não tem permissão para acessar a página.</span>
          <Link href="entrar" className="text-sky-600 underline">
            Voltar para área segura
          </Link>
        </div>
      </div>
    </div>
  )
}
