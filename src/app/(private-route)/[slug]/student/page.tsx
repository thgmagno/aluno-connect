import Querys from '@/actions/querys'
import Dialog from '@/components/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AuthService from '@/services/auth-service'
import { Edit, MoreVertical, RefreshCcw, Trash2 } from 'lucide-react'
import React from 'react'

// parent, instructor, administrator
export default async function StudentsPage() {
  const students = await Querys.Read.findMany.Students()
  const profile = await AuthService.getUserProfile()

  const isAdmin = profile === 'administrator'

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Listar todos os estudantes</h1>
        {isAdmin && <Dialog.Create.Student />}
      </section>

      {students?.length ? (
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
            {students.map((student) => (
              <TableRow
                key={student.id}
                className="text-white hover:text-black"
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  {student.birthdate.toLocaleDateString('pt-br')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuLabel className="truncate">
                        {student.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <RefreshCcw className="mr-2 h-4 w-4" /> Resetar senha
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhum estudante cadastrado
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
