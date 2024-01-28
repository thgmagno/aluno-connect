import {
  BookMarkedIcon,
  GraduationCap,
  ListTodo,
  Presentation,
  ShieldCheckIcon,
} from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdministratorDashboardPage() {
  const CustomLink = ({
    href,
    children,
  }: {
    href: string
    children: ReactNode
  }) => {
    return (
      <Link
        href={href}
        className="flex items-center rounded-md bg-zinc-950/40 p-2 py-5 text-muted-foreground shadow sm:flex-col"
      >
        {children}
      </Link>
    )
  }

  return (
    <section className="mt-8 grid gap-3 font-medium sm:grid-cols-4">
      <CustomLink href="students">
        <GraduationCap className="mx-4 h-7 w-7 sm:mx-0 sm:mb-2" />
        Alunos
      </CustomLink>
      <CustomLink href="parents">
        <ShieldCheckIcon className="mx-4 h-7 w-7 sm:mx-0 sm:mb-2" />
        Responsáveis
      </CustomLink>
      <CustomLink href="instructors">
        <BookMarkedIcon className="mx-4 h-7 w-7 sm:mx-0 sm:mb-2" />
        Instrutores
      </CustomLink>
      <CustomLink href="classrooms">
        <Presentation className="mx-4 h-7 w-7 sm:mx-0 sm:mb-2" />
        Turmas
      </CustomLink>
      <CustomLink href="requests">
        <ListTodo className="mx-4 h-7 w-7 sm:mx-0 sm:mb-2" />
        Solicitações
      </CustomLink>
    </section>
  )
}
