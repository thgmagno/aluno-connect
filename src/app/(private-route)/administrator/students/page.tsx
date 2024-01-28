import DropdownMenuAdminStudents from '@/components/dropdown-menu/admin-students'
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit } from 'lucide-react'
import Link from 'next/link'

export default async function AdministratorStudentsPage() {
  const students = await queries.student.findManyStudents()

  return (
    <div className="mt-5">
      <nav className="mb-5 flex items-center gap-2 text-muted-foreground">
        <Link href={paths.homePath('administrator')}>
          <ArrowLeft />
        </Link>
        <h1>Lista de todos os estudantes.</h1>
      </nav>

      {students.length ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="max-w-[150px] truncate">
                  {student.name}
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger title="Editar">
                      <Edit className="mr-2 h-5 w-5" />
                    </DialogTrigger>
                    <DialogContent>
                      <form action="" className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            name="name"
                            type="text"
                            defaultValue={student.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            name="email"
                            type="email"
                            defaultValue={student.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="birthdate">Data de aniversário</Label>
                          <Input
                            name="birthdate"
                            type="date"
                            defaultValue={student.birthdate
                              .toISOString()
                              .slice(0, 10)}
                          />
                        </div>

                        <DialogFooter>
                          <Button>Salvar</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuAdminStudents />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-lg font-medium text-muted-foreground">
          Não há registros de alunos no momento
        </p>
      )}
    </div>
  )
}
