import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queries } from '@/db/queries'
import { $Enums } from '@prisma/client'
import { Check, ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ClassroomIdStudentIdProps {
  params: {
    classId: string
    studentId: string
  }
}

export default async function ClassroomIdStudentId({
  params,
}: ClassroomIdStudentIdProps) {
  const last30Frequencies =
    await queries.frequency.findLast30ByStudentIdAndClassId(
      params.studentId,
      params.classId,
    )

  const studentData = await queries.student.findStudentById(params.studentId)

  function statusMapping(status: $Enums.Status) {
    switch (status) {
      case 'PENDING':
        return <span className="flex items-center">Aguardando aprovação</span>
      case 'APPROVED':
        return (
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" /> Justificado
          </span>
        )
      case 'REJECTED':
        return (
          <span className="flex items-center">
            <X className="mr-2 h-5 w-5" /> Justificativa rejeitada
          </span>
        )
      case 'PRESENT':
        return (
          <span className="flex items-center">
            <Check className="mr-2 h-5 w-5" /> Presente
          </span>
        )
      case 'ABSENT':
        return (
          <span className="flex items-center">
            <X className="mr-2 h-5 w-5" /> Faltou
          </span>
        )
    }
  }

  return (
    <React.Fragment>
      <Link
        href={`/instructor/classroom/${params.classId}`}
        className="flex gap-2 text-muted-foreground"
      >
        <ChevronLeft />
        Voltar
      </Link>

      {last30Frequencies.length ? (
        <React.Fragment>
          <h1 className="my-3 text-center text-lg text-muted-foreground">
            Frequência de: {studentData.name}
          </h1>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead></TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Situação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {last30Frequencies.map((freq, index) => (
                <TableRow key={freq.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {freq.date.toLocaleDateString('pt-BR', {
                      dateStyle: 'short',
                    })}
                  </TableCell>
                  <TableCell>{statusMapping(freq.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          Não há registros de frequências para o aluno
        </p>
      )}
    </React.Fragment>
  )
}
