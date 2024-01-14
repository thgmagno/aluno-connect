import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdmParent() {
  const listParents = await prisma.parent.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/alunos/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      <h1>Listagem de responsáveis</h1>
      {listParents.length}
    </>
  )
}
