'use client'

import { PartialUser } from '@/lib/types'
import { userStore } from '@/store/user'
import React, { useEffect } from 'react'
import Link, { LinkProps } from 'next/link'
import { ChevronLeft, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { actions } from '@/actions'

interface GoBackProps {
  href: LinkProps['href']
  as?: LinkProps['as']
}

export function Navbar({ user }: { user: PartialUser }) {
  const pathname = usePathname()
  const { setUser } = userStore()

  useEffect(() => {
    setUser(user)
  }, [])

  const options = {
    STUDENT: [{ href: '/minhas-turmas', name: 'Minhas turmas' }],
    PARENT: [{ href: '/aluno', name: 'Alunos' }],
    INSTRUCTOR: [{ href: '/turma', name: 'Turmas' }],
    ADMINISTRATOR: [
      { href: '/alunos', name: 'Alunos' },
      { href: '/responsaveis', name: 'Responsáveis' },
      { href: '/instrutores', name: 'Instrutores' },
      { href: '/turmas', name: 'Turmas' },
      { href: '/solicitacoes', name: 'Solicitações' },
    ],
  }

  return (
    <nav className="flex justify-between bg-neutral-900/50 p-2 py-5 font-medium text-neutral-300 shadow-md">
      <ul className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={`transition-all duration-500 ${pathname === '/' ? 'border-b-2 border-neutral-400' : 'border-b-transparent'}`}
        >
          Início
        </Link>
        {options[user.profile].map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`transition-all duration-500 ${pathname === item.href ? 'border-b-2 border-neutral-400' : 'border-b-transparent'}`}
          >
            {item.name}
          </Link>
        ))}
      </ul>

      {/* // TODO: Criar componente separado */}
      {/* <form action={logout}> */}
      <button
        onClick={() => actions.auth.logout()}
        className="flex items-center gap-2"
      >
        Sair
        <LogOut size={20} />
      </button>
      {/* </form> */}
    </nav>
  )
}

export function GoBack({ href, as }: GoBackProps) {
  return (
    <Link href={href} as={as} className="flex max-w-32 items-center px-2 py-5">
      <ChevronLeft className="mr-1 h-6 w-6" /> Voltar
    </Link>
  )
}
