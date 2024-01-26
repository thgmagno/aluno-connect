import React from 'react'
import { Classrooms } from '@/actions/crud/getAll/Classrooms'
import { RenderEntity } from '@/components/common/render-entity'
import { DialogEntity } from '@/components/common/dialog-entity'

// instructor, administrator
export default async function ClassroomsPage() {
  const classrooms = await Classrooms()

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Listar todas as turmas</h1>
        <DialogEntity category="class">Nova turma</DialogEntity>
      </section>
      {classrooms ? (
        <RenderEntity category="classroom" data={classrooms} />
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhuma turma cadastrada
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
