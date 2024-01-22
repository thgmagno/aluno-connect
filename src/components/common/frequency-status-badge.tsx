import type { $Enums } from '@prisma/client'
import React from 'react'
import { Badge } from '../ui/badge'

interface Props {
  status: $Enums.Status
}

export default function FrequencyStatusBadge({ status }: Props) {
  return (
    <React.Fragment>
      {status === 'PRESENT' && <Badge variant={'primary'}>Presente</Badge>}
      {status === 'ABSENT' && <Badge variant={'destructive'}>Faltou</Badge>}
      {status === 'PENDING' && <Badge variant={'pending'}>Em análise</Badge>}
      {status === 'APPROVED' && (
        <Badge variant={'primary'}>Falta justificada</Badge>
      )}
      {status === 'REJECTED' && (
        <Badge variant={'destructive'}>Solicitação rejeitada</Badge>
      )}
    </React.Fragment>
  )
}
