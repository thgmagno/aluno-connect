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
import SignOutForm from '@/modules/auth/components/sign-out-form'

import { Menu, UserCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdmNavbar({
  name,
  profile,
}: {
  name: string
  profile: string
}) {
  return (
    <div className="absolute left-0 top-0 flex h-16 w-full flex-wrap items-center justify-between bg-stone-900 p-2">
      <p className="font-semibold text-slate-100 lg:hidden">{name}</p>
      <div className="flex gap-2 text-slate-100">
        <Link href="/administrador" className="hidden lg:flex">
          Inicio
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/administrador/alunos" className="hidden lg:flex">
          Alunos
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/administrador/instrutores" className="hidden lg:flex">
          Instrutores
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/administrador/responsaveis" className="hidden lg:flex">
          Responsaveis
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/administrador/turmas" className="hidden lg:flex">
          Turmas
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/administrador/solicitacoes" className="hidden lg:flex">
          Solicitações
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className="gap-2">
            <UserCircle className="hidden lg:flex" />{' '}
            <Menu className="lg:hidden" />{' '}
            <p className="hidden lg:flex">{name}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">
            {profile}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="lg:hidden" />
          <DropdownMenuGroup className="lg:hidden">
            <DropdownMenuItem>
              <Link href="/admnistrador" className="w-full p-1">
                Inicio
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/administrador/alunos" className="w-full p-1">
                Alunos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/administrador/instrutores" className="w-full p-1">
                Instrutores
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/administrador/responsaveis" className="w-full p-1">
                Responsaveis
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/administrador/turmas" className="w-full p-1">
                Turmas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/administrador/solicitacoes" className="w-full p-1">
                Solicitações
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem>
            <SignOutForm />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
