import { formatDate } from '@/lib/utils'
import type { Student } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function RenderStudentList({
  students,
}: {
  students: Student[]
}) {
  return (
    <div className="table w-full rounded bg-zinc-200 text-center shadow-lg">
      <div className="table-header-group">
        <div className="table-row font-semibold">
          <div className="table-cell py-2">Nome</div>
          <div className="table-cell py-2">Email</div>
          <div className="table-cell py-2">Data de Nascimento</div>
          <div className="table-cell py-2">Ações</div>
        </div>
      </div>
      <div className="table-row-group">
        {students.map((student) => (
          <div className="table-row hover:bg-zinc-300">
            <div className="table-cell py-2">{student.name}</div>
            <div className="table-cell py-2">{student.email}</div>
            <div className="table-cell py-2">
              {formatDate(student.birthdate)}
            </div>
            <div className="table-cell py-2">
              <Link
                href={`/administrador/alunos/${student.id}`}
                className="flex justify-center"
              >
                <ArrowRight
                  strokeWidth={4}
                  className="rounded bg-zinc-500 p-1 text-zinc-100 hover:bg-indigo-500"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
