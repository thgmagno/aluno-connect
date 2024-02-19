import { actions } from '@/actions'
import ButtonCreateRegister from '@/components/common/button-create-register'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { UpsertParentForm } from '@/components/forms/upsert-parent-form'
import { Suspense } from 'react'

export default async function ParentPage() {
  const parentList = await actions.administrator.getParents()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ButtonCreateRegister
          pathname="/responsaveis"
          query={{ modal: 'cadastrar' }}
        />
        <RenderList user={parentList} />
        <UpsertParentForm />
      </Suspense>
    </div>
  )
}
