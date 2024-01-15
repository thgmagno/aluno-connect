import { getRecordByID } from '@/actions/admin-actions'
import UpdateForm from '@/components/administrator/update-form'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdmStudentEdit({
  params,
}: {
  params: { id: string }
}) {
  const { student } = await getRecordByID({
    id: params.id,
    category: 'student',
  })
  if (!student) redirect('/administrador/alunos')

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/alunos'}>
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </Navigation.container>

      {/* Formulário */}
      <UpdateForm
        id={student.id}
        name={student.name}
        email={student.email}
        birthdate={student?.birthdate}
        category="student"
      />
    </>
  )
}
