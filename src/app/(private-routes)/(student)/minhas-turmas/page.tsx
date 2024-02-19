import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { Classroom } from '@/lib/types'
import { useSession } from '@/session'
import { Suspense } from 'react'

export default async function StudentClassroomPage() {
  const user = await useSession()
  const classroomList = (await actions.student.getClassroom(
    user.id,
  )) as Classroom[]

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList classroom={classroomList} />
      </Suspense>
    </div>
  )
}
