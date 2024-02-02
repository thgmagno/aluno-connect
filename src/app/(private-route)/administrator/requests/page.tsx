import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
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

export default async function AdministratorRequestsPage() {
  const requests = await queries.request.findManyRequests()

  return (
    <React.Fragment>
      {requests.length ? (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Data</TableHead>
              <TableHead>Aluno</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  {req.frequencyID.date.toLocaleDateString('pt-br')}
                </TableCell>
                <TableCell>{req.studentID.name}</TableCell>
                <TableCell>
                  <FrequencyStatusBadge status={req.frequencyID.status} />
                </TableCell>
                <TableCell>Implementar</TableCell>
                <TableCell className="text-center">Implementar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de solicitações no momento.
        </p>
      )}
    </React.Fragment>
  )
}
