import { getRecordByID } from '@/actions/admin-actions'
import UpdateForm from '@/components/administrator/update-form'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdmClassEdit({
  params,
}: {
  params: { id: string }
}) {
  const { _class } = await getRecordByID({
    id: params.id,
    category: 'class',
  })
  if (!_class) redirect('/administrador/turmas')

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/turmas'}>
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </Navigation.container>

      {/* Formulário */}
      <UpdateForm
        id={_class.id}
        name={_class.course_name}
        category="class"
        email=""
        birthdate={new Date()}
      />
    </>
  )
}
