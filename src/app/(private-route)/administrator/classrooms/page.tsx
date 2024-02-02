import {
  DropdownMenuAdmin,
  UpsertFormClassroom,
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

export default async function AdministratorClassroomsPage() {
  const classrooms = await queries.classroom.findManyClasses()

  return (
    <React.Fragment>
      <UpsertFormClassroom />
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
                  <UpsertFormClassroom data={classroom} />
                  <DropdownMenuAdmin id={classroom.id} category="classroom" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de turmas no momento.
        </p>
      )}
    </React.Fragment>
  )
}
