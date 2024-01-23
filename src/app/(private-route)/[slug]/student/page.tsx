import Querys from '@/actions/querys'
import Dialog from '@/components/dialog'
import AuthService from '@/services/auth-service'
import React from 'react'

// parent, instructor, administrator
export default async function StudentsPage() {
  const students = await Querys.Read.findMany.Students()
  const profile = await AuthService.getUserProfile()

  const isAdmin = profile === 'administrator'

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Listar todos os estudantes</h1>
        {isAdmin && <Dialog.Create.Student />}
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
