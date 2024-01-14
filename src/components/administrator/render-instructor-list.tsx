import type { Instructor } from '@prisma/client'
import * as Table from '@/components/common/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Edit, Settings } from 'lucide-react'
import Link from 'next/link'
import DeleteInstructorForm from './delete-instructor-form'
import ResetInstructorPassword from './reset-instructor-password'

export default function RenderInstructorList({
  instructors,
}: {
  instructors: Instructor[]
}) {
  return (
    <Table.Content>
      <Table.Header>
        <Table.Cell>Nome</Table.Cell>
        <Table.Cell>E-mail</Table.Cell>
        <Table.Cell>Ações</Table.Cell>
      </Table.Header>
      <Table.Body>
        {instructors.map((instructor) => (
          <Table.Row key={instructor.id}>
            <Table.Cell>{instructor.name}</Table.Cell>
            <Table.Cell>{instructor.email}</Table.Cell>
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
                      href={`/administrador/alunos/${instructor.id}/editar`}
                      className="flex-1"
                    >
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex h-12">
                    <ResetInstructorPassword id={instructor.id} />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex h-12">
                    <DeleteInstructorForm id={instructor.id} />
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
