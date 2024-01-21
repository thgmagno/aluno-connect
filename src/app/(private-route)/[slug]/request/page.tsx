import getAll from '@/actions/read/getAll'
import React from 'react'

// student, parent
export default async function RequestPage() {
  const requests = await getAll.Requests()

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Lista de solicitações</h1>
      {requests?.length ? (
        requests.map((req) => (
          <div key={req.id}>
            <p>
              {req.frequencyID.date.toLocaleDateString('pt-br', {
                dateStyle: 'long',
              })}
            </p>
            <p>{req.justification}</p>
          </div>
        ))
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhuma requisição em aberto
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
