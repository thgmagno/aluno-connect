import { actions } from '@/actions'
import ButtonCreateRegister from '@/components/common/button-create-register'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { UpsertStudentForm } from '@/components/forms/upsert-student-form'
import { PartialUser } from '@/lib/types'
import { Suspense } from 'react'

export default async function AdminStudentPage() {
  const studentList: PartialUser[] = await actions.administrator.getStudents()

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ButtonCreateRegister
          pathname="/alunos"
          query={{ modal: 'cadastrar' }}
        />
        <RenderList user={studentList} />
        <UpsertStudentForm />
      </Suspense>
    </>
  )
}
