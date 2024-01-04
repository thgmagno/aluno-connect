import prisma from '@/lib/prisma'
import EditStudentForm from '@/modules/administrator/components/edit-student-form'
import ContentMain from '@/modules/common/components/content-main'
import NavigationBar from '@/modules/common/components/navigation-bar'

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
      <NavigationBar goBack="/alunos" />
      <EditStudentForm
        id={params.id}
        name={student?.name ?? ''}
        email={student?.email ?? ''}
      />
    </ContentMain>
  )
}
