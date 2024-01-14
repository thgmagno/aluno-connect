import RenderList from '@/components/administrator/render-list'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AdmStudent() {
  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/alunos/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      <RenderList profile="student" />
    </>
  )
}
