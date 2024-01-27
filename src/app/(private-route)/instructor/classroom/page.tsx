import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRightCircle } from 'lucide-react'

export default function InstructorClassroomPage() {
  const classrooms = [
    {
      id: '1',
      course_name: 'Turma A',
    },
    {
      id: '2',
      course_name: 'Turma B',
    },
    {
      id: '3',
      course_name: 'Turma C',
    },
  ]

  return (
    <>
      <h1 className="text-lg font-medium text-muted-foreground">
        Minhas turmas
      </h1>
      {classrooms ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome do curso</TableHead>
              <TableHead>Qtde. de alunos</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classrooms.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>{classroom.course_name}</TableCell>
                <TableCell>Implementar!</TableCell>
                <TableCell>
                  <ArrowRightCircle />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Nenhuma turma cadastrada para você nesse momento.</p>
      )}
    </>
  )
}
