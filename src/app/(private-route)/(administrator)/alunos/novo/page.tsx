import CreateStudentForm from '@/modules/administrator/components/create-student-form'
import ContentMain from '@/modules/common/components/content-main'
import NavigationBar from '@/modules/common/components/navigation-bar'

export default async function StudentNew() {
  return (
    <ContentMain>
      <NavigationBar goBack="/alunos" />
      <CreateStudentForm />
    </ContentMain>
  )
}
