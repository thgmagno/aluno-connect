import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queries } from '@/db/queries'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link'

export default async function InstructorClassroomPage() {
  const classrooms = await queries.classroom.findClassesForInstructors()

  return (
    <>
      {classrooms.length ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome do curso</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classrooms.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>{classroom.course_name}</TableCell>
                <TableCell className="text-center">
                  <Link href={`classroom/${classroom.id}`}>
                    <ArrowRightCircle className="mx-auto" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Nenhuma turma cadastrada para você nesse momento.
        </p>
      )}
    </>
  )
}
