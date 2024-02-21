import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import { GoBack } from '@/components/common/navbar'
import RenderList from '@/components/common/render-list'
import CreateFrequencyForm from '@/components/forms/create-frequency-form'
import { PartialUser } from '@/lib/types'
import { ParseInt } from '@/utils/parse-int'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default async function InstructorClassroomFrequencyPage({
  params,
}: {
  params: { classroom_id: string }
}) {
  const [classroom, frequencyList, studentList] = await Promise.all([
    actions.instructor.getClassroomById(ParseInt(params.classroom_id)),
    actions.instructor.getClassroomFrequency(ParseInt(params.classroom_id)),
    actions.instructor.getClassroomStudents(
      ParseInt(params.classroom_id),
    ) as Promise<PartialUser[]>,
  ])

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <GoBack href="/turma" />
        <Button className="mr-2" variant="solid" color="primary">
          <Link href={{ query: { modal: 'chamada' } }}>Chamada</Link>
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
        <RenderList frequencyGrouped={frequencyList} />
      </Suspense>
      <CreateFrequencyForm studentList={studentList} classroom={classroom} />
    </React.Fragment>
  )
}
