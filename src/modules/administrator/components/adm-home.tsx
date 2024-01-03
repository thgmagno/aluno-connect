import ContentHome from '@/modules/common/components/content-home'
import IconMenu from '@/modules/common/components/icon-menu'
import {
  BookCheck,
  FileCheck,
  GraduationCap,
  Presentation,
  ShieldHalf,
} from 'lucide-react'

export default function AdmHome() {
  return (
    <ContentHome>
      <IconMenu href="alunos" title="Alunos" icon={<GraduationCap />} />
      <IconMenu href="instrutores" title="Instrutores" icon={<BookCheck />} />
      <IconMenu
        href="responsaveis"
        title="Responsáveis"
        icon={<ShieldHalf />}
      />
      <IconMenu href="turmas" title="Turmas" icon={<Presentation />} />
      <IconMenu href="solicitacoes" title="Solicitações" icon={<FileCheck />} />
    </ContentHome>
  )
}
