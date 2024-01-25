import Querys from '@/actions/querys'
import SearchBar from '@/components/common/search-bar'
import Dialog from '@/components/dialog'
import RenderStudents from '@/components/common/render-students'
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
        {isAdmin && <Dialog.Create.Student>Novo aluno</Dialog.Create.Student>}
      </section>

      <SearchBar />
      {students?.length ? (
        <RenderStudents data={students} />
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
