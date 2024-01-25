'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Student } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import Dialog from '../dialog'

interface Props {
  data: Student[]
}

export default function RenderStudents({ data }: Props) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const filteredArray =
    data.filter(
      (student) =>
        student.name.includes(search) || student.email.includes(search),
    ) ?? data

  return (
    <Table className="mx-auto">
      <TableCaption>Listar todos os estudantes</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-neutral-950/40">
        {filteredArray.map((student) => (
          <TableRow key={student.id} className="text-white hover:text-black">
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>
              {student.birthdate.toLocaleDateString('pt-br')}
            </TableCell>
            <TableCell>
              <Dialog.Create.Student data={student}>
                Editar
              </Dialog.Create.Student>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
