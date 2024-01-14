import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdmClass() {
  const listClass = await prisma.class.findMany({
    orderBy: { course_name: 'asc' },
  })

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/turmas/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      {listClass.length > 0 ? (
        <p>Redenrizando...</p>
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          Não há turmas cadastradas no momento
        </p>
      )}
    </>
  )
}
