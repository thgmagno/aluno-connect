import getAll from '@/actions/read/getAll'
import React from 'react'

// student, parent
export default async function FrequencyPage() {
  const frequencies = await getAll.Frequencies()

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Lista de frequência do aluno</h1>
      {frequencies?.length &&
        frequencies.map((frequency) => (
          <div key={frequency.id}>
            <p>
              {frequency.date.toLocaleDateString('pt-br', {
                dateStyle: 'long',
              })}
            </p>
            <p>{frequency.status}</p>
          </div>
        ))}
    </React.Fragment>
  )
}
