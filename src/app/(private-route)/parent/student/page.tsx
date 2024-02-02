import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queries } from '@/db/queries'
export default async function ParentStudentPage() {
  const students = await queries.student.findStudentsForParents()

  return (
    <>
      <h1>Renderizar todos os estudantes pelo qual é responsável:</h1>
      {students ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome do aluno</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell className="text-center">Implementar!</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há nenhum registro de aluno para mostrar.
        </p>
      )}
    </>
  )
}
