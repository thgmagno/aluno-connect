import { FrequencyForm } from '@/components/instructor'
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
        <Link
          href={`/instructor/classroom/${params.classId}`}
          className="flex text-muted-foreground"
        >
          <ChevronLeft />
          Voltar
        </Link>
      </nav>

      <h1 className="my-3 text-center text-lg text-muted-foreground">
        Chamada: {classData.course_name}
      </h1>

      <FrequencyForm classroomId={params.classId} students={students} />
    </React.Fragment>
  )
}
