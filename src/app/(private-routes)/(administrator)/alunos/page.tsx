import { actions } from '@/actions'
import { Loading } from '@/components/common/loading'
import RenderList from '@/components/common/render-list'
import { UpdateStudentForm } from '@/components/forms/update-student-form'
import { PartialUser } from '@/lib/types'
import { Suspense } from 'react'

export default async function AdminStudentPage() {
  const studentList: PartialUser[] = await actions.administrator.getStudents()

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RenderList user={studentList} />
        <UpdateStudentForm />
      </Suspense>
    </div>
  )
}
