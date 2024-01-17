'use client'

import { X, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import {
  approveAbsenceJustification,
  rejectAbsenceJustification,
} from '@/actions/admin-actions'

export default function AprovalForm({ requestId }: { requestId: string }) {
  return (
    <section className="flex justify-end gap-2">
      <form action={rejectAbsenceJustification}>
        <button type="submit">
          <input type="hidden" name="requestId" value={requestId} />
          <Badge variant={'destructive'}>
            <X className="mr-1" size={20} /> Recusar
          </Badge>
        </button>
      </form>
      <form action={approveAbsenceJustification}>
        <button type="submit">
          <input type="hidden" name="requestId" value={requestId} />
          <Badge variant={'primary'}>
            <Check className="mr-1" size={20} /> Aceitar
          </Badge>
        </button>
      </form>
    </section>
  )
}
