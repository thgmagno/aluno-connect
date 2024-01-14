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
import DeleteForm from '@/components/administrator/delete-form'
import ResetPassword from '@/components/administrator/reset-password'
import { UserType } from '@/lib/types'
import prisma from '@/lib/prisma'

export default function RenderList({ profile }: { profile: UserType }) {
  async function studentList() {
    const listStudents = await prisma.student.findMany({
      orderBy: { name: 'asc' },
    })

    return (
      <>
        {!listStudents.length ? (
          <p className="text-center text-xl text-muted-foreground">
            Não há registros de alunos cadastrados no sistema
          </p>
        ) : (
          <Table.Content>
            <Table.Header>
              <Table.Cell>Nome</Table.Cell>
              <Table.Cell>E-mail</Table.Cell>
              <Table.Cell>Data de Nascimento</Table.Cell>
              <Table.Cell>Ações</Table.Cell>
            </Table.Header>
            <Table.Body>
              {listStudents.map((student) => (
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
                          <Link
                            href={`/administrador/alunos/${student.id}/editar`}
                            className="flex flex-1"
                          >
                            <Edit size={20} className="mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex h-12">
                          <ResetPassword id={student.id} profile="student" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex h-12">
                          <DeleteForm id={student.id} profile="student" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        )}
      </>
    )
  }

  async function instructorList() {
    const listInstructors = await prisma.instructor.findMany({
      orderBy: { name: 'asc' },
    })

    return (
      <>
        {!listInstructors.length ? (
          <p className="text-center text-xl text-muted-foreground">
            Não há registros de instrutores cadastrados no sistema
          </p>
        ) : (
          <Table.Content>
            <Table.Header>
              <Table.Cell>Nome</Table.Cell>
              <Table.Cell>E-mail</Table.Cell>
              <Table.Cell>Ações</Table.Cell>
            </Table.Header>
            <Table.Body>
              {listInstructors.map((instructor) => (
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
                          <Link
                            href={`/administrador/instrutores/${instructor.id}/editar`}
                            className="flex flex-1"
                          >
                            <Edit size={20} className="mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex h-12">
                          <ResetPassword
                            id={instructor.id}
                            profile="instructor"
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex h-12">
                          <DeleteForm id={instructor.id} profile="instructor" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        )}
      </>
    )
  }

  async function parentList() {
    const listParents = await prisma.parent.findMany({
      orderBy: { name: 'asc' },
    })

    return (
      <>
        {!listParents.length ? (
          <p className="text-center text-xl text-muted-foreground">
            Não há registros de responsáveis cadastrados no sistema
          </p>
        ) : (
          <Table.Content>
            <Table.Header>
              <Table.Cell>Nome</Table.Cell>
              <Table.Cell>E-mail</Table.Cell>
              <Table.Cell>Ações</Table.Cell>
            </Table.Header>
            <Table.Body>
              {listParents.map((parent) => (
                <Table.Row key={parent.id}>
                  <Table.Cell>{parent.name}</Table.Cell>
                  <Table.Cell>{parent.email}</Table.Cell>
                  <Table.Cell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <Settings className="rounded  text-zinc-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="font-semibold">
                        <DropdownMenuItem className="flex h-12">
                          <Link
                            href={`/administrador/responsaveis/${parent.id}/editar`}
                            className="flex flex-1"
                          >
                            <Edit size={20} className="mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex h-12">
                          <ResetPassword id={parent.id} profile="parent" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex h-12">
                          <DeleteForm id={parent.id} profile="parent" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        )}
      </>
    )
  }

  return (
    <>
      {profile === 'student' && studentList()}
      {profile === 'instructor' && instructorList()}
      {profile === 'parent' && parentList()}
    </>
  )
}
