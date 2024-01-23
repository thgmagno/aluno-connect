'use client'

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
import { Edit, MoreVertical, RefreshCcw, Trash2 } from 'lucide-react'
import type { Student } from '@prisma/client'
import { useSearchParams } from 'next/navigation'

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
  )
}
