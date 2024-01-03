import AdmHome from '@/modules/administrator/components/adm-home'
import AuthService from '@/modules/auth/services/auth-service'
import ContentMain from '@/modules/common/components/content-main'
import { cookies } from 'next/headers'

export default async function Home() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return

  const { profile } = await AuthService.openSessionToken(token.value)

  // TODO: Criar página para os perfis
  // const isInstructor = profile === 'instructor'
  // const isStudent = profile === 'student'
  // const isParent = profile === 'parent'
  const isAdmin = profile === 'administrator'

  return <ContentMain>{isAdmin && <AdmHome />}</ContentMain>
}
