import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { queries } from '@/db/queries'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ClassroomFrequencyProps {
  params: {
    classId: string
  }
}

export default async function ClassroomFrequency({
  params,
}: ClassroomFrequencyProps) {
  const students = await queries.student.findStudentsForClass(params.classId)

  const classData = await queries.classroom.findClassById(params.classId)

  return (
    <React.Fragment>
      <nav className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger className="flex" asChild>
            <button className="flex text-muted-foreground">
              <ChevronLeft />
              Voltar
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>As alterações serão perdidas.</AlertDialogTitle>
              <AlertDialogDescription>
                Se deseja salvar as alterações, clique em "Cancelar" e, em
                seguida, em "Salvar"
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Link
                href={`/instructor/classroom/${params.classId}`}
                className={buttonVariants()}
              >
                Continuar sem salvar
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>

      <h1 className="my-3 text-center text-lg text-muted-foreground">
        Chamada: {classData.course_name}
      </h1>
    </React.Fragment>
  )
}
