import {
  DropdownMenuAdmin,
  UpsertFormStudent,
} from '@/components/administrator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queries } from '@/db/queries'
import paths from '@/paths'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AdministratorStudentsPage() {
  const students = await queries.student.findManyStudents()

  return (
    <div className="mt-5">
      <nav className="mb-5 flex items-center gap-2 text-muted-foreground">
        <Link href={paths.homePath('administrator')}>
          <ArrowLeft />
        </Link>
        <h1>Lista de todos os estudantes.</h1>
      </nav>

      <UpsertFormStudent />
      {students.length ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="max-w-[150px] truncate">
                  {student.name}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <UpsertFormStudent data={student} />
                  <DropdownMenuAdmin id={student.id} category="student" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de alunos no momento
        </p>
      )}
    </div>
  )
}
