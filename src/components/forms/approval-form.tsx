'use client'

import React from 'react'
import updateActions from '@/actions/update'
import BtnFormSubmit from '../common/btn-form-submit'

export default function ApprovalForm({ frequencyId }: { frequencyId: string }) {
  return (
    <section className="flex gap-3">
      <form action={updateActions.RejectRequest}>
        <input type="hidden" name="frequencyId" value={frequencyId} />
        <BtnFormSubmit variant={'destructive'} size={'sm'}>
          Recusar
        </BtnFormSubmit>
      </form>
      <form action={updateActions.ApproveRequest}>
        <input type="hidden" name="frequencyId" value={frequencyId} />
        <BtnFormSubmit variant={'emerald'} size={'sm'}>
          Aprovar
        </BtnFormSubmit>
      </form>
    </section>
  )
}
