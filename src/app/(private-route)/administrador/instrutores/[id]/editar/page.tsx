import Link from 'next/link'
import UpdateForm from '@/components/administrator/update-form'
import { redirect } from 'next/navigation'
import { getRecordByID } from '@/actions/admin-actions'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'

export default async function AdmInstructorEdit({
  params,
}: {
  params: { id: string }
}) {
  const { instructor } = await getRecordByID({
    id: params.id,
    category: 'instructor',
  })
  if (!instructor) redirect('/administrador/instrutores')

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/instrutores'}>
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </Navigation.container>

      {/* Formulário */}
      <UpdateForm
        id={instructor.id}
        name={instructor.name}
        email={instructor.email}
        birthdate={new Date()}
        category="instructor"
      />
    </>
  )
}
