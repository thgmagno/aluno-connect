import db from '@/actions/db'
import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import paths from '@/paths'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AdministratorRequestsPage() {
  const requests = await db.FindManyRequests()

  return (
    <div className="mt-5">
      <nav className="mb-5 flex items-center gap-2 text-muted-foreground">
        <Link href={paths.homePath('administrator')}>
          <ArrowLeft />
        </Link>
        <h1>Lista de todas as solicitações</h1>
      </nav>
      {requests.length ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Data</TableHead>
              <TableHead>Aluno</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ação</TableHead>
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
                <TableCell>Implementar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de requisições no momento.
        </p>
      )}
    </div>
  )
}
