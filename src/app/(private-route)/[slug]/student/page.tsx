import Querys from '@/actions/querys'
import { Button } from '@/components/ui/button'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import Link from 'next/link'
import React from 'react'

// parent, instructor, administrator
export default async function StudentsPage() {
  const students = await Querys.Read.findMany.Students()
  const profile = await AuthService.getUserProfile()

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Listar todos os estudantes</h1>
        <Button variant={'primary'}>
          <Link href={paths.createEntityPath(profile, 'student')}>
            Cadastrar
          </Link>
        </Button>
      </section>

      {students?.length ? (
        students.map((student) => (
          <div key={student.id}>
            <p>{student.name}</p>
            <p>{student.email}</p>
          </div>
        ))
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhum estudante cadastrado
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
