import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdmInstructor() {
  const listInstructors = await prisma.instructor.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/alunos/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      <h1>Listagem de instrutores</h1>
      {listInstructors.length}
    </>
  )
}
