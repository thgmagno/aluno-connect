import db from '@/actions/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import paths from '@/paths'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AdministratorInstructorsPage() {
  const instructors = await db.FindManyInstructors()

  return (
    <div className="mt-5">
      <nav className="mb-5 flex items-center gap-2 text-muted-foreground">
        <Link href={paths.homePath('administrator')}>
          <ArrowLeft />
        </Link>
        <h1>Lista de todos os instrutores.</h1>
      </nav>
      {instructors.length ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell>Implementar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de instrutores no momento.
        </p>
      )}
    </div>
  )
}
