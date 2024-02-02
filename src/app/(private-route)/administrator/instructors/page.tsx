import {
  DropdownMenuAdmin,
  UpsertFormInstructor,
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

export default async function AdministratorInstructorsPage() {
  const instructors = await queries.instructor.findManyInstructors()

  return (
    <React.Fragment>
      <UpsertFormInstructor />
      {instructors.length ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.email}</TableCell>
                <TableCell className="text-center">
                  <UpsertFormInstructor data={instructor} />
                  <DropdownMenuAdmin id={instructor.id} category="instructor" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de instrutores no momento.
        </p>
      )}
    </React.Fragment>
  )
}
