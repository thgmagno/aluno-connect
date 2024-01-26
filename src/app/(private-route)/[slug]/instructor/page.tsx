import { Instructors } from '@/actions/crud/getAll/Intructors'
import { DialogEntity } from '@/components/common/dialog-entity'
import { RenderEntity } from '@/components/common/render-entity'
import React from 'react'

// administrator
export default async function InstructorsPage() {
  const instructors = await Instructors()

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Listar todos os instrutores</h1>
        <DialogEntity category="instructor">Novo instrutor</DialogEntity>
      </section>
      {instructors ? (
        <RenderEntity category="instructor" data={instructors} />
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhum instrutor cadastrado
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
