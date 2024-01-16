import { getRecordByID } from '@/actions/admin-actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import FrequencyListForm from '@/components/instructor/frequency-list-form'

export default async function InstructorClassID({
  params,
}: {
  params: { id: string }
}) {
  const { _class } = await getRecordByID({
    id: params.id,
    category: 'class',
  })
  if (!_class) redirect('/instrutor/turmas')

  const students = await prisma.studentClass.findMany({
    where: { classId: _class.id },
    include: { studentID: true },
  })

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <b className="text-lg text-muted-foreground">{_class.course_name}</b>
        <Link href={'/instrutor/turmas'}>
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </div>

      {/* Formulário */}
      {!students.length ? (
        <p className="text-center text-xl text-muted-foreground">
          Não há registros de alunos nessa turma
        </p>
      ) : (
        <FrequencyListForm students={students} />
      )}
    </>
  )
}
