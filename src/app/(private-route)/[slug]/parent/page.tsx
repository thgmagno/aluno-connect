import Querys from '@/actions/querys'
import React from 'react'

// administrator
export default async function ParentsPage() {
  const parents = await Querys.Read.findMany.Parents()

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Lista de todos os responsáveis</h1>
      {parents?.length ? (
        parents.map((parent) => (
          <div key={parent.id}>
            <p>{parent.name}</p>
            <p>{parent.email}</p>
          </div>
        ))
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhum responsável cadastrado
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
