import { DropdownMenuAdmin, UpsertFormParent } from '@/components/administrator'
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

export default async function AdministratorParentsPage() {
  const parents = await queries.parent.findManyParents()

  return (
    <React.Fragment>
      <UpsertFormParent />
      {parents.length ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.name}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell className="text-center">
                  <UpsertFormParent data={parent} />
                  <DropdownMenuAdmin id={parent.id} category="parent" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de Responsáveis no momento.
        </p>
      )}
    </React.Fragment>
  )
}
