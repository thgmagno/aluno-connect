'use client'

import Mutations from '@/actions/mutations'
import React from 'react'

interface Props {
  category: string
  requestId: string
}

export function setCategoryToRequest({ category, requestId }: Props) {
  return (
    <form action={Mutations.Update.SetCategoryToRequest}>
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="requestId" value={requestId} />
      <button type="submit">{category}</button>
    </form>
  )
}
