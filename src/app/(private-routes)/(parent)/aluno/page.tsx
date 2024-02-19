import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { useSession } from '@/session'
import { Suspense } from 'react'

export default async function ParentStudentPage() {
  const user = await useSession()
  const studentList = await actions.parent.getStudent(user.id)

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList user={studentList} />
      </Suspense>
    </div>
  )
}
