import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { Suspense } from 'react'

export default async function AdminClassroomPage() {
  const classroomList = await actions.administrator.getClassrooms()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList classroom={classroomList} />
      </Suspense>
    </div>
  )
}
