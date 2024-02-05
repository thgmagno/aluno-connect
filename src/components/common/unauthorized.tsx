import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="my-5 flex flex-col items-center justify-center space-y-5 text-muted-foreground">
      <h1 className="flex items-center text-xl font-semibold text-red-700">
        Não autorizado
      </h1>
      <span>O usuário logado não tem permissão para acessar a página.</span>
      <Link href="/" className="text-indigo-700 underline">
        Voltar para página inicial
      </Link>
    </div>
  )
}
