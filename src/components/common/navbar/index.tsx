import { UserType } from '@/lib/types'
import { cookies } from 'next/headers'
import React from 'react'
import NavbarSmall from './navbar-small'
import NavbarLarger from './navbar-larger'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, User } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Logotipo from '@/components/common/logotipo'
import Link from 'next/link'

interface Props {
  profile: UserType
}

export function Navbar({ profile }: Props) {
  async function Logout() {
    'use server'
    cookies().delete('session-aluno-connect')
  }

  const options = {
    student: [
      { href: '/student/frequency', name: 'Início' },
      { href: '/student/requests', name: 'Histórico de solicitações' },
    ],
    parent: [
      { href: '/parent/students', name: 'Alunos' },
      { href: '/parent/students', name: 'Alunos' },
      { href: '/parent/students', name: 'Alunos' },
    ],
    instructor: [{ href: '/instructor/classroom', name: 'Turmas' }],
    administrator: [
      { href: '/administrator/dashboard', name: 'Início' },
      { href: '/administrator/students', name: 'Alunos' },
      { href: '/administrator/parents', name: 'Responsáveis' },
      { href: '/administrator/instructors', name: 'Instrutores' },
      { href: '/administrator/classrooms', name: 'Turmas' },
      { href: '/administrator/requests', name: 'Solicitações' },
    ],
  }

  return (
    <React.Fragment>
      {/* Small */}
      <nav className="flex justify-between px-4 text-muted-foreground lg:hidden">
        <Link href="/" className="flex">
          <Logotipo className="flex w-40" />
        </Link>
        <NavbarSmall options={options[profile]} logout={Logout} />
      </nav>

      {/* Larger */}
      <nav className="hidden justify-between p-4 text-muted-foreground lg:flex">
        <NavbarLarger options={options[profile]} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex">
              <User />
              <ChevronDown className="relative top-0.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 w-48">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full rounded p-2 text-left font-medium hover:bg-neutral-200 hover:text-red-500">
                  Finalizar sessão
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Finalizar sessão?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <form action={Logout}>
                    <Button
                      type="submit"
                      variant="destructive"
                      className="w-full"
                    >
                      Confirmar
                    </Button>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </React.Fragment>
  )
}
