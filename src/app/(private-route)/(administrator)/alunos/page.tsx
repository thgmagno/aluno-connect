import BtnGoBack from '@/modules/common/components/btn-go-back'
import ContentHome from '@/modules/common/components/content-home'
import ContentMain from '@/modules/common/components/content-main'

export default function StudentList() {
  return (
    <ContentMain>
      <BtnGoBack href="/" />
      <ContentHome>
        <h1 className="col-span-2">Lista de todos os alunos.</h1>
      </ContentHome>
    </ContentMain>
  )
}
