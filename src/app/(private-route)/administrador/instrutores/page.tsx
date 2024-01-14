import RenderInstructorList from '@/components/administrator/render-instructor-list'
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
        <Link href={'/administrador/instrutores/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      {listInstructors.length > 0 ? (
        <RenderInstructorList instructors={listInstructors} />
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          Não há instrutores cadastrados no sistema
        </p>
      )}
    </>
  )
}
