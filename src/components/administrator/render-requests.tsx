import { RenderRequestsProps } from '@/lib/types'
import React from 'react'
import AprovalForm from './aproval-form'

export default function RenderRequests({ data }: RenderRequestsProps) {
  return (
    <React.Fragment>
      {data.map((req) => (
        <section
          key={req.id}
          className={`mb-4 flex flex-col gap-1.5 rounded-lg p-4 shadow-md ${
            req.status === 'PENDING'
              ? 'bg-white'
              : req.status === 'APPROVED'
                ? 'border-2 border-emerald-500 bg-emerald-300'
                : 'border-2 border-red-400 bg-red-300'
          }`}
        >
          <p className="text-base font-semibold">
            Data da falta:{' '}
            {req.date.toLocaleDateString('pt-br', { dateStyle: 'long' })}
          </p>
          <p className="mb-4 text-base font-semibold">
            Nome do aluno: {req.studentID.name}
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            Justificativa do aluno:
          </p>
          <div className="mb-2 rounded-md border-2 border-neutral-300 bg-neutral-200 p-2">
            {req.justification}
          </div>
          <div className="flex justify-end gap-4"></div>
          {req.status === 'PENDING' && <AprovalForm requestId={req.id} />}
        </section>
      ))}
    </React.Fragment>
  )
}
