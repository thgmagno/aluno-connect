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
import React from 'react'

export default async function AdministratorStudentsPage() {
  const students = await queries.student.findManyStudents()

  return (
    <React.Fragment>
      <UpsertFormStudent />
      {students.length ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="max-w-[150px] truncate">
                  {student.name}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="text-center">
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
    </React.Fragment>
  )
}
