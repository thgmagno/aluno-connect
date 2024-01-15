import Link from 'next/link'
import UpdateForm from '@/components/administrator/update-form'
import { redirect } from 'next/navigation'
import { getRecordByID } from '@/actions/admin-actions'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'

export default async function AdmParentEdit({
  params,
}: {
  params: { id: string }
}) {
  const { parent } = await getRecordByID({
    id: params.id,
    category: 'parent',
  })
  if (!parent) redirect('/administrador/responsaveis')

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/responsaveis'}>
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </Navigation.container>

      {/* Formulário */}
      <UpdateForm
        id={parent.id}
        name={parent.name}
        email={parent.email}
        birthdate={new Date()}
        category="parent"
      />
    </>
  )
}
