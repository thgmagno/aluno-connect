import prisma from '@/lib/prisma'
import EditStudentForm from '@/modules/administrator/components/edit-student-form'
import BtnGoBack from '@/modules/common/components/btn-go-back'
import ContentMain from '@/modules/common/components/content-main'

export default async function StudentID({
  params,
}: {
  params: { id: string }
}) {
  const student = await prisma.student.findFirst({
    where: {
      id: params.id,
    },
  })

  return (
    <ContentMain>
      <BtnGoBack href="/alunos" />
      <EditStudentForm
        id={params.id}
        name={student?.name ?? ''}
        email={student?.email ?? ''}
      />
    </ContentMain>
  )
}
