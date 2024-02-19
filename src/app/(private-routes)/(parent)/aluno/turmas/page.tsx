import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { Classroom } from '@/lib/types'
import { ParseInt } from '@/utils/parse-int'
import { Suspense } from 'react'

export default async function ParentClassroomPage({
  searchParams,
}: {
  searchParams: { aluno: string }
}) {
  const classroomList = (await actions.parent.getStudentClassroom(
    ParseInt(searchParams.aluno),
  )) as Classroom[]

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList classroom={classroomList} />
      </Suspense>
    </div>
  )
}
