import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ParentStudentPage() {
  const students = [
    { id: '1', name: 'Aluno A' },
    { id: '2', name: 'Aluno B' },
    { id: '3', name: 'Aluno C' },
  ]

  return (
    <div>
      <h1>Renderizar todos os estudantes pelo qual é responsável:</h1>
      {students ? (
        <Table>
          <TableHeader>
            <TableHead>Nome do aluno</TableHead>
            <TableHead>Ação</TableHead>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>Implementar!</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Não há nenhum registro de aluno para mostrar.</p>
      )}
    </div>
  )
}
