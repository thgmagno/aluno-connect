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
        <Link href={'/administrador/responsaveis/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      {listParents.length > 0 ? (
        <p>Redenrizando...</p>
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          Não encontramos registros de responsáveis em nossa base de dados
        </p>
      )}
    </>
  )
}
