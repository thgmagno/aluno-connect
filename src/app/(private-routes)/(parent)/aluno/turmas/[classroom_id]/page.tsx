import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import { GoBack } from '@/components/common/navbar'
import RenderList from '@/components/common/render-list'
import JustifyAbsenseForm from '@/components/forms/justify-absense'
import { Frequency } from '@/lib/types'
import { ParseInt } from '@/utils/parse-int'
import { Suspense } from 'react'

export default async function ParentClassroomFrequencyPage({
  params,
  searchParams,
}: {
  params: { classroom_id: string }
  searchParams: { aluno: string }
}) {
  const data = (await actions.parent.getStudentFrequency(
    ParseInt(searchParams.aluno),
    ParseInt(params.classroom_id),
  )) as Frequency[]

  return (
    <div>
      <GoBack
        href={{
          pathname: '/aluno/turmas',
          query: { aluno: `${searchParams.aluno}` },
        }}
      />
      <Suspense fallback={<Loading />}>
        <RenderList frequency={data} />
      </Suspense>
      <JustifyAbsenseForm />
    </div>
  )
}
