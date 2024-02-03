import { buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queries } from '@/db/queries'
import { ChevronLeft, ChevronRightCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ClassroomIdProps {
  params: {
    classId: string
  }
}

export default async function ClassroomId({ params }: ClassroomIdProps) {
  const students = await queries.student.findStudentsForClass(params.classId)

  const classData = await queries.classroom.findClassById(params.classId)

  return (
    <React.Fragment>
      <nav className="flex justify-between">
        <Link
          href={`/instructor/classroom`}
          className="flex gap-2 text-muted-foreground"
        >
          <ChevronLeft />
          Voltar
        </Link>

        <Link
          href={`/instructor/classroom/${params.classId}/frequency`}
          className={buttonVariants({ variant: 'emerald' })}
        >
          Chamada
        </Link>
      </nav>

      {students.length ? (
        <React.Fragment>
          <h1 className="my-3 text-center text-lg text-muted-foreground">
            Turma: {classData.course_name}
          </h1>
          <Table className="mx-auto w-full lg:w-1/2">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Aluno(a)</TableHead>
                <TableHead className="text-center">Frequência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Link href={`${params.classId}/${student.id}`}>
                      <ChevronRightCircle className="mx-auto" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      ) : (
        <h1>Não há registros de Frequências</h1>
      )}
    </React.Fragment>
  )
}
