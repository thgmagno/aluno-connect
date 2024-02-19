import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { useSession } from '@/session'
import { Suspense } from 'react'

export default async function InstructorClassroomPage() {
  const user = await useSession()
  const classroomList = await actions.instructor.getClassroom(user.id)

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList classroom={classroomList} />
      </Suspense>
    </div>
  )
}
