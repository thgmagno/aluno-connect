import type { Student } from '@prisma/client'
import Link from 'next/link'
import * as Table from '@/components/common/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Edit, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DeleteStudentForm from './delete-student-form'
import ResetStudentPassword from './reset-student-password'

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
          <Table.Row key={student.id}>
            <Table.Cell>{student.name}</Table.Cell>
            <Table.Cell>{student.email}</Table.Cell>
            <Table.Cell>
              {student.birthdate.toLocaleDateString('pt-br')}
            </Table.Cell>
            <Table.Cell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Settings className="rounded  text-zinc-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-semibold">
                  <DropdownMenuItem className="flex h-12">
                    <Edit size={20} className="mr-2" />
                    <Link
                      href={`/administrador/alunos/${student.id}/editar`}
                      className="flex-1"
                    >
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex h-12">
                    <ResetStudentPassword id={student.id} />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex h-12">
                    <DeleteStudentForm id={student.id} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  )
}
