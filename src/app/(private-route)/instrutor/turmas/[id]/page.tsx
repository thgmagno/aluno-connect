import { getRecordByID } from '@/actions/admin-actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import * as Table from '@/components/common/table'
import prisma from '@/lib/prisma'
import SwitchFrequency from '@/components/instructor/switch-frequency'

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
        <form
          action={async (formData: FormData) => {
            'use server'

            const status = formData.get('status')
            const student = formData.get('student')
            console.log(status, student)
          }}
          className="mx-auto max-w-xl"
        >
          <Table.Content>
            <Table.Header>
              <Table.Cell>Nome do aluno</Table.Cell>
              <Table.Cell>Frequência</Table.Cell>
            </Table.Header>
            <Table.Body>
              {students.map((student) => (
                <Table.Row key={student.id}>
                  <Table.Cell>{student.studentID.name}</Table.Cell>
                  <Table.Cell>
                    <SwitchFrequency studentID={student.studentID.id} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
          <Button type="submit" variant={'primary'} className="mt-4 w-full">
            Finalizar
          </Button>
        </form>
      )}
    </>
  )
}
