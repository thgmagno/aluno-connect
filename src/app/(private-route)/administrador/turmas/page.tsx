import RenderEntity from '@/components/administrator/render-entity'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AdmClass() {
  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/turmas/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      <RenderEntity category="class" />
    </>
  )
}
