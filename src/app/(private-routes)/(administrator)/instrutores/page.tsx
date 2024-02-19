import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { Suspense } from 'react'

export default async function InstructorPage() {
  const instructorList = await actions.administrator.getInstructors()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList user={instructorList} />
      </Suspense>
    </div>
  )
}
