import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import { GoBack } from '@/components/common/navbar'
import RenderList from '@/components/common/render-list'
import { FrequencyGrouped } from '@/lib/types'
import { ParseInt } from '@/utils/parse-int'
import { Button } from '@nextui-org/button'
import { Suspense } from 'react'

export default async function InstructorClassroomFrequencyPage({
  params,
}: {
  params: { classroom_id: string }
}) {
  const data: FrequencyGrouped[] =
    await actions.instructor.getClassroomFrequency(
      ParseInt(params.classroom_id),
    )

  return (
    <div>
      <div className="flex items-center justify-between">
        <GoBack href="/turma" />
        <Button className="mr-2">Chamada</Button>
      </div>
      <Suspense fallback={<Loading />}>
        <RenderList frequencyGrouped={data} />
      </Suspense>
    </div>
  )
}
