import { actions } from '@/actions'
import ButtonCreateRegister from '@/components/common/button-create-register'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { UpsertInstructorForm } from '@/components/forms/upsert-instructor-form'
import { Suspense } from 'react'

export default async function InstructorPage() {
  const instructorList = await actions.administrator.getInstructors()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ButtonCreateRegister
          pathname="/instrutores"
          query={{ modal: 'cadastrar' }}
        />
        <RenderList user={instructorList} />
        <UpsertInstructorForm />
      </Suspense>
    </div>
  )
}
