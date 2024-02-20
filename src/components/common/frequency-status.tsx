'use client'

import { EnumStatus } from '@/lib/types'

export function FrequencyStatus({ status }: { status: EnumStatus }) {
  let textColor = ''
  let text = ''
  switch (status) {
    case 'ABSENT':
      textColor = 'text-amber-500'
      text = 'FALTOU'
      break
    case 'APPROVED':
      textColor = 'text-sky-500'
      text = 'JUSTIFICADO'
      break
    case 'PENDING':
      textColor = 'text-yellow-500'
      text = 'PENDENTE'
      break
    case 'PRESENT':
      textColor = 'text-emerald-500'
      text = 'PRESENTE'
      break
    case 'REJECTED':
      textColor = 'text-red-400'
      text = 'JUSTIFICATIVA REJEITADA'
      break

    default:
      break
  }
  return (
    <span
      className={`rounded-full bg-neutral-950/70 p-1 px-2 text-xs font-medium ${textColor}`}
    >
      {text}
    </span>
  )
}
