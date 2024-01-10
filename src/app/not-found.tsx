import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-md flex-col items-center text-zinc-300">
        <Image
          src="/images/erro-404.png"
          alt="Página não encontrada"
          height={100}
          width={100}
          className="mx-auto"
        />
        <h2 className="mt-2 text-xl font-extrabold lg:text-3xl">
          Página não encontrada
        </h2>
        <Link
          href={'/'}
          className="mt-2 text-lg font-semibold text-blue-500 underline"
        >
          Voltar para área segura
        </Link>
      </div>
    </div>
  )
}
