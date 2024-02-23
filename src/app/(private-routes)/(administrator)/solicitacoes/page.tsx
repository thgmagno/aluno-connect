import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import SetCategoryForm from '@/components/forms/set-category-form'
import { Suspense } from 'react'

export default async function RequestPage() {
  const requestList = await actions.administrator.getRequests()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList request={requestList} />
        <SetCategoryForm />
      </Suspense>
    </div>
  )
}
