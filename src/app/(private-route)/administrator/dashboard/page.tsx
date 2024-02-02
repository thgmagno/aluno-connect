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
        className="flex items-center rounded-md bg-neutral-950/40 p-2 py-5 text-muted-foreground shadow sm:flex-col"
      >
        {children}
      </Link>
    )
  }

  return (
    <section className="grid gap-3 font-medium sm:grid-cols-4">
      <CustomLink href="students">
        <GraduationCap className="icon" />
        Alunos
      </CustomLink>
      <CustomLink href="parents">
        <ShieldCheckIcon className="icon" />
        Responsáveis
      </CustomLink>
      <CustomLink href="instructors">
        <BookMarkedIcon className="icon" />
        Instrutores
      </CustomLink>
      <CustomLink href="classrooms">
        <Presentation className="icon" />
        Turmas
      </CustomLink>
      <CustomLink href="requests">
        <ListTodo className="icon" />
        Solicitações
      </CustomLink>
    </section>
  )
}
