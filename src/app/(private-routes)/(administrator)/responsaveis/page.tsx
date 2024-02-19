import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { Suspense } from 'react'

export default async function ParentPage() {
  const parentList = await actions.administrator.getParents()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList user={parentList} />
      </Suspense>
    </div>
  )
}
