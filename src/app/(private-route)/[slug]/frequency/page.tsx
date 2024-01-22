import Querys from '@/actions/querys'
import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import Link from 'next/link'
import React from 'react'

// student, parent
export default async function FrequencyPage() {
  const profile = await AuthService.getUserProfile()
  const frequencies = await Querys.Read.findMany.Frequencies()

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Lista de frequência do aluno</h1>

      <Table className="mx-auto max-w-xl">
        <TableCaption>Lista de freqências.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-neutral-950/40">
          {frequencies?.map((frequency) => (
            <TableRow
              key={frequency.id}
              className="text-white hover:text-black"
            >
              <TableCell className="font-medium">
                {frequency.date.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <FrequencyStatusBadge status={frequency.status} />
              </TableCell>
              <TableCell>
                {frequency.status === 'ABSENT' && (
                  <Link
                    href={paths.createEntityPath(
                      profile,
                      'request',
                      frequency.id,
                    )}
                    className="border-black hover:border-b"
                  >
                    Justificar
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
