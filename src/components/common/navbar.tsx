import Link from 'next/link'
import SignOutForm from '@/components/auth/sign-out-form'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import {
  BookMarked,
  Dot,
  GraduationCap,
  Home,
  ListTodo,
  Menu,
  Presentation,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '../ui/button'

export default async function Navbar() {
  const profile = await AuthService.getUserProfile()

  const isAdmin = profile === 'administrator'
  const isStudent = profile === 'student'
  // TODO: const isUnderAge = 'implementar'
  const isParent = profile === 'parent'
  const isInstructor = profile === 'instructor'

  const formatedProfile = {
    administrator: 'Administrador',
    student: 'Estudante',
    parent: 'Responsável',
    instructor: 'Instrutor',
  }

  return (
    <React.Fragment>
      <nav className="flex items-center justify-end bg-neutral-800 p-4 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Menu color="white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-1.5 w-56">
            <DropdownMenuLabel className="cursor-default">
              {formatedProfile[profile]}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-2">
              <Link
                href={paths.homePath(profile)}
                className="flex items-center rounded-md border p-2"
              >
                <Home className="mr-2 h-4 w-4" />
                Início
              </Link>
              {(isAdmin || isInstructor || isParent) && (
                <Link
                  href={paths.getEntitiesPath(profile, 'student')}
                  className="flex items-center rounded-md border p-2"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Alunos
                </Link>
              )}
              {isAdmin && (
                <Link
                  href={paths.getEntitiesPath(profile, 'parent')}
                  className="flex items-center rounded-md border p-2"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Responsáveis
                </Link>
              )}
              {isAdmin && (
                <Link
                  href={paths.getEntitiesPath(profile, 'instructor')}
                  className="flex items-center rounded-md border p-2"
                >
                  <BookMarked className="mr-2 h-4 w-4" />
                  Instrutores
                </Link>
              )}
              {(isAdmin || isInstructor) && (
                <Link
                  href={paths.getEntitiesPath(profile, 'classroom')}
                  className="flex items-center rounded-md border p-2"
                >
                  <Presentation className="mr-2 h-4 w-4" />
                  Turmas
                </Link>
              )}
              {(isAdmin || isParent || isStudent) && (
                <Link
                  href={paths.getEntitiesPath(profile, 'request')}
                  className="flex items-center rounded-md border p-2"
                >
                  <ListTodo className="mr-2 h-4 w-4" />
                  Solicitações
                </Link>
              )}
              <Button className="w-full" variant={'destructive'}>
                <SignOutForm />
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <nav className="hidden items-center justify-between bg-neutral-800 p-2 md:flex">
        <section className="flex gap-1 text-neutral-100">
          <Link href={paths.homePath(profile)}>Início</Link>
          {(isAdmin || isInstructor || isParent) && (
            <React.Fragment>
              <Dot />
              <Link href={paths.getEntitiesPath(profile, 'student')}>
                Alunos
              </Link>
            </React.Fragment>
          )}
          {isAdmin && (
            <React.Fragment>
              <Dot />
              <Link href={paths.getEntitiesPath(profile, 'parent')}>
                Responsáveis
              </Link>
            </React.Fragment>
          )}
          {isAdmin && (
            <React.Fragment>
              <Dot />
              <Link href={paths.getEntitiesPath(profile, 'instructor')}>
                Instrutores
              </Link>
            </React.Fragment>
          )}
          {(isAdmin || isInstructor) && (
            <React.Fragment>
              <Dot />
              <Link href={paths.getEntitiesPath(profile, 'classroom')}>
                Turmas
              </Link>
            </React.Fragment>
          )}
          {(isAdmin || isStudent || isParent) && (
            <React.Fragment>
              <Dot />
              <Link href={paths.getEntitiesPath(profile, 'request')}>
                Solicitações
              </Link>
            </React.Fragment>
          )}
        </section>
        <Button
          className="rounded-md-full hover:text-red-600"
          variant={'secondary'}
          size="sm"
        >
          <SignOutForm />
        </Button>
      </nav>
    </React.Fragment>
  )
}
