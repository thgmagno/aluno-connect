import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { UserType } from '@/lib/types'
import SignOutForm from '@/modules/auth/components/sign-out-form'

import { Menu, UserCircle } from 'lucide-react'
import Link from 'next/link'

interface AdmHomeProps {
  name: string
  profile: UserType
}

export default function AdmHome({ name, profile }: AdmHomeProps) {
  return (
    <Navbar>
      <p className="font-semibold text-slate-100 md:hidden">{name}</p>
      <div className="flex gap-2 text-slate-100">
        <Link href="/" className="hidden md:flex">
          Inicio
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/alunos" className="hidden md:flex">
          Alunos
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/instrutores" className="hidden md:flex">
          Instrutores
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/responsaveis" className="hidden md:flex">
          Responsaveis
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/turmas" className="hidden md:flex">
          Turmas
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/solicitacoes" className="hidden md:flex">
          Solicitações
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className="gap-2">
            <UserCircle className="hidden md:flex" />{' '}
            <Menu className="md:hidden" />{' '}
            <p className="hidden md:flex">{name}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">
            {profile}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="md:hidden" />
          <DropdownMenuGroup className="md:hidden">
            <DropdownMenuItem>
              <Link href="/">Inicio</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/alunos">Alunos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/instrutores">Instrutores</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/responsaveis">Responsaveis</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/turmas">Turmas</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/solicitacoes">Solicitações</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem>
            <SignOutForm />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Navbar>
  )
}
