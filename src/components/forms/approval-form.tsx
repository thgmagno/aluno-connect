'use client'

import React from 'react'
import BtnFormSubmit from '../common/btn-form-submit'
import Mutations from '@/actions/mutations'

export function approvalRequest({ frequencyId }: { frequencyId: string }) {
  return (
    <section className="flex gap-3">
      <form action={Mutations.Update.ApproveRequest}>
        <input type="hidden" name="frequencyId" value={frequencyId} />
        <BtnFormSubmit variant={'destructive'} size={'sm'}>
          Recusar
        </BtnFormSubmit>
      </form>
      <form action={Mutations.Update.ApproveRequest}>
        <input type="hidden" name="frequencyId" value={frequencyId} />
        <BtnFormSubmit variant={'emerald'} size={'sm'}>
          Aprovar
        </BtnFormSubmit>
      </form>
    </section>
  )
}
