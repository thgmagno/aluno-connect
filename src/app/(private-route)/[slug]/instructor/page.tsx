import getAll from '@/actions/read/getAll'
import React from 'react'

// administrator
export default async function InstructorsPage() {
  const instructors = await getAll.Instructors()

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Listar todos os instrutores</h1>
      {instructors?.length ? (
        instructors.map((instrutor) => (
          <div key={instrutor.id}>
            <p>{instrutor.name}</p>
            <p>{instrutor.email}</p>
          </div>
        ))
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
