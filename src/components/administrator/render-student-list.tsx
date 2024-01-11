import type { Student } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import * as Table from '@/components/common/table'

export default function RenderStudentList({
  students,
}: {
  students: Student[]
}) {
  return (
    <Table.Content>
      <Table.Header>
        <Table.Cell>Nome</Table.Cell>
        <Table.Cell>E-mail</Table.Cell>
        <Table.Cell>Data de Nascimento</Table.Cell>
        <Table.Cell>Ações</Table.Cell>
      </Table.Header>
      <Table.Body>
        {students.map((student) => (
          <Table.Row>
            <Table.Cell>{student.name}</Table.Cell>
            <Table.Cell>{student.email}</Table.Cell>
            <Table.Cell>
              {student.birthdate.toLocaleDateString('pt-br')}
            </Table.Cell>
            <Table.Cell>
              <Link
                href={`/administrador/alunos/${student.id}`}
                className="flex justify-center"
              >
                <ArrowRight
                  strokeWidth={4}
                  className="rounded bg-zinc-500 p-1 text-zinc-100 hover:bg-indigo-500"
                />
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  )
}
