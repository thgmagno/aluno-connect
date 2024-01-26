import React from 'react'
import SearchBar from '@/components/common/search-bar'
import AuthService from '@/services/auth-service'
import { Students } from '@/actions/crud/getAll/Students'
import { RenderEntity } from '@/components/common/render-entity'
import { DialogEntity } from '@/components/common/dialog-entity'

// parent, instructor, administrator
export default async function StudentsPage() {
  const students = await Students()
  const profile = await AuthService.getUserProfile()
  const isAdmin = profile === 'administrator'

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Listar todos os estudantes</h1>
        {isAdmin && <DialogEntity category="student">Novo aluno</DialogEntity>}
      </section>

      <SearchBar />
      {students ? (
        <RenderEntity category="student" data={students} />
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
