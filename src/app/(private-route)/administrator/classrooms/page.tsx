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

export default async function AdministratorClassroomsPage() {
  const classrooms = await queries.classroom.findManyClasses()

  return (
    <div className="mt-5">
      <nav className="mb-5 flex items-center gap-2 text-muted-foreground">
        <Link href={paths.homePath('administrator')}>
          <ArrowLeft />
        </Link>
        <h1 className="text-lg font-medium">Lista de todas as turmas.</h1>
      </nav>
      {classrooms.length ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome do curso</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classrooms.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>{classroom.course_name}</TableCell>
                <TableCell>Implementar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de turmas no momento.
        </p>
      )}
    </div>
  )
}
