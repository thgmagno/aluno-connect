import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import { GoBack } from '@/components/common/navbar'
import RenderList from '@/components/common/render-list'
import { Frequency } from '@/lib/types'
import { useSession } from '@/session'
import { ParseInt } from '@/utils/parse-int'
import { Suspense } from 'react'

export default async function StudentClassroomFrequencyPage({
  params,
}: {
  params: { classroom_id: string }
}) {
  const user = await useSession()
  const data: Frequency[] = await actions.student.getFrequency(
    user.id,
    ParseInt(params.classroom_id),
  )

  return (
    <div>
      <GoBack href="/minhas-turmas" />

      <Suspense fallback={<Loading />}>
        <RenderList frequency={data} />
      </Suspense>
    </div>
  )
}
