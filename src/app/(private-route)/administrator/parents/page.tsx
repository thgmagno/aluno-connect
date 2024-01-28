import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queries } from '@/db/queries'
import paths from '@/paths'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AdministratorParentsPage() {
  const parents = await queries.parent.findManyParents()

  return (
    <div className="mt-5">
      <nav className="mb-5 flex items-center gap-2 text-muted-foreground">
        <Link href={paths.homePath('administrator')}>
          <ArrowLeft />
        </Link>
        <h1>Lista de todos os Responsáveis.</h1>
      </nav>
      {parents.length ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.name}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>Implementar.</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de Responsáveis no momento.
        </p>
      )}
    </div>
  )
}
