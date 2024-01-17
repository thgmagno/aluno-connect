import { RenderRequestsProps } from '@/lib/types'
import React from 'react'
import { Badge } from '../ui/badge'
import { Check, X } from 'lucide-react'

export default function RenderRequests({ data }: RenderRequestsProps) {
  return (
    <React.Fragment>
      {data.map((req) => (
        <section
          key={req.id}
          className="mb-4 flex flex-col gap-3 rounded-lg bg-white p-4 shadow-md"
        >
          <p className="text-base font-semibold">
            Data da falta:{' '}
            {req.date.toLocaleDateString('pt-br', { dateStyle: 'long' })}
          </p>
          <p className="mb-4 text-base font-semibold">
            Nome do aluno: {req.studentID.name}
          </p>
          <p className="mb-2 font-semibold text-muted-foreground">
            Justificativa do aluno:
          </p>
          <div className="text-gray-600">{req.justification}</div>
          <div className="flex justify-end gap-4">
            <button>
              <Badge variant={'destructive'}>
                <X className="mr-1" size={20} /> Recusar
              </Badge>
            </button>
            <button>
              <Badge variant={'primary'}>
                <Check className="mr-1" size={20} /> Aceitar
              </Badge>
            </button>
          </div>
        </section>
      ))}
    </React.Fragment>
  )
}
