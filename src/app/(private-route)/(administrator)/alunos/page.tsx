import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import ContentMain from '@/modules/common/components/content-main'
import NavigationBar from '@/modules/common/components/navigation-bar'
import Link from 'next/link'

export default async function StudentList() {
  const students = await prisma.student.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <ContentMain>
      <NavigationBar goBack="/" register="/alunos/novo" />
      <div className="flex flex-col">
        <ul className="col-auto">
          {students.map((student) => (
            <li
              key={student.id}
              className="mb-3 flex w-[300px] items-center justify-between rounded-md bg-zinc-100 p-2 sm:w-[400px] md:w-[500px]"
            >
              {student.name}
              <Link href={`alunos/${student.id}`}>
                <Button>Editar</Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ContentMain>
  )
}
