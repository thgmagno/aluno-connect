import { getStudentByID } from '@/actions/admin-actions'
import UpdateStudentForm from '@/components/administrator/update-student-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdmStudentEdit({
  params,
}: {
  params: { id: string }
}) {
  const { student } = await getStudentByID(params.id)
  if (!student) redirect('/administrador/alunos')

  return (
    <>
      {/* TODO: implements composition pattern */}
      <nav className="mb-4 flex justify-end">
        <Link href={`/administrador/alunos`}>
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </nav>

      {/* Formulário */}
      <UpdateStudentForm
        id={student.id}
        name={student.name}
        email={student.email}
      />
    </>
  )
}
