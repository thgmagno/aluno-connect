import type { Class, Instructor, Parent, Student } from '@prisma/client'
import { DialogEntity } from '@/components/common/dialog-entity'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

interface Props {
  category: 'student' | 'parent' | 'instructor' | 'classroom'
  data: Student[] | Parent[] | Instructor[] | Class[]
}

function Student({ data }: { data: Student[] }) {
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
        {data.map((student) => (
          <TableRow key={student.id} className="text-white hover:text-black">
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>
              {student.birthdate.toLocaleDateString('pt-br')}
            </TableCell>
            <TableCell>
              <DialogEntity category="student" data={student}>
                Editar
              </DialogEntity>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Parent({ data }: { data: Parent[] }) {
  return (
    <Table className="mx-auto">
      <TableCaption>Listar todos os responsáveis</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-neutral-950/40">
        {data.map((parent) => (
          <TableRow key={parent.id} className="text-white hover:text-black">
            <TableCell>{parent.name}</TableCell>
            <TableCell>{parent.email}</TableCell>
            <TableCell>
              <DialogEntity category="parent" data={parent}>
                Editar
              </DialogEntity>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Instructor({ data }: { data: Instructor[] }) {
  return (
    <Table className="mx-auto">
      <TableCaption>Listar todos os instrutores</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-neutral-950/40">
        {data.map((instructor) => (
          <TableRow key={instructor.id} className="text-white hover:text-black">
            <TableCell>{instructor.name}</TableCell>
            <TableCell>{instructor.email}</TableCell>
            <TableCell>
              <DialogEntity category="instructor" data={instructor}>
                Editar
              </DialogEntity>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Classroom({ data }: { data: Class[] }) {
  return (
    <Table className="mx-auto">
      <TableCaption>Listar todos as turmas</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome do curso</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-neutral-950/40">
        {data.map((classroom) => (
          <TableRow key={classroom.id} className="text-white hover:text-black">
            <TableCell>{classroom.course_name}</TableCell>
            <TableCell>
              <DialogEntity category="class" data={classroom}>
                Editar
              </DialogEntity>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function RenderEntity({ category, data }: Props) {
  return (
    <>
      {category === 'student' && <Student data={data as Student[]} />}
      {category === 'parent' && <Parent data={data as Parent[]} />}
      {category === 'instructor' && <Instructor data={data as Instructor[]} />}
      {category === 'classroom' && <Classroom data={data as Class[]} />}
    </>
  )
}
