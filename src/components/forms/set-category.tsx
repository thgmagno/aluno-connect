'use client'

import Querys from '@/actions/querys'
import React from 'react'

interface Props {
  category: string
  requestId: string
}

export function SetCategoryToRequest({ category, requestId }: Props) {
  return (
    <form action={Querys.Update.SetCategoryToRequest}>
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="requestId" value={requestId} />
      <button type="submit">{category}</button>
    </form>
  )
}
