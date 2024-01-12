import RenderStudentList from '@/components/administrator/render-student-list'
import { Navigation } from '@/components/common/navigation-bar'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdmStudent() {
  const listStudents = await prisma.student.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <>
      <Navigation.container>
        <Link href={'/administrador/alunos/novo'}>
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </Navigation.container>

      {listStudents.length > 0 ? (
        RenderStudentList({ students: listStudents })
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          Não encontramos registros de estudantes em nossa base de dados
        </p>
      )}
    </>
  )
}
