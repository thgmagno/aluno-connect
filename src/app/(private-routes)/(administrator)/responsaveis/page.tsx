import { actions } from '@/actions'
import ButtonCreateRegister from '@/components/common/button-create-register'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import LinkStudentParentForm from '@/components/forms/link-student-parent-form'
import { UpsertParentForm } from '@/components/forms/upsert-parent-form'
import { Suspense } from 'react'

export default async function ParentPage() {
  const [parentList, studentList] = await Promise.all([
    actions.administrator.getParents(),
    actions.administrator.getStudents(),
  ])

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ButtonCreateRegister
          pathname="/responsaveis"
          query={{ modal: 'cadastrar' }}
        />
        <RenderList user={parentList} />
        <LinkStudentParentForm studentList={studentList} />
        <UpsertParentForm />
      </Suspense>
    </div>
  )
}
