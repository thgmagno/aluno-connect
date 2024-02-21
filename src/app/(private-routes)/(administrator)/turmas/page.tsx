import { actions } from '@/actions'
import ButtonCreateRegister from '@/components/common/button-create-register'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import LinkInstructorForm from '@/components/forms/link-instructor-form'
import LinkStudentForm from '@/components/forms/link-student-form'
import { UpsertClassroomForm } from '@/components/forms/upsert-classroom-form'
import { Suspense } from 'react'

export default async function AdminClassroomPage() {
  const classroomList = await actions.administrator.getClassrooms()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ButtonCreateRegister
          pathname="turmas"
          query={{ modal: 'cadastrar' }}
        />
        <RenderList classroom={classroomList} />
        <UpsertClassroomForm />
        <LinkStudentForm />
        <LinkInstructorForm />
      </Suspense>
    </div>
  )
}
