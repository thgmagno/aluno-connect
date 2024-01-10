import RenderStudentList from '@/components/administrator/render-student-list'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AdmStudent() {
  const listStudents = await prisma.student.findMany()

  return (
    <div className="relative">
      <nav className="mb-4 flex justify-end">
        <Link href="/administrador/alunos/novo">
          <Button variant={'primary'}>Cadastrar</Button>
        </Link>
      </nav>
      {listStudents.length > 0 ? (
        RenderStudentList({ students: listStudents })
      ) : (
        <p>Não encontramos registros de estudantes em nossa base de dados</p>
      )}
    </div>
  )
}
