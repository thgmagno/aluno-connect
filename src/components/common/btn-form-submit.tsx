'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function BtnFormSubmit({ title }: { title: string }) {
  const { pending } = useFormStatus()

  const loading = () => (
    <div className="flex gap-1.5">
      <div className="h-4 w-4 animate-spin rounded-full border-4 border-zinc-300 border-r-zinc-500/80" />
      Aguarde...
    </div>
  )

  return (
    <Button
      type="submit"
      variant={'primary'}
      className={`w-28 ${pending ? 'cursor-not-allowed text-xs' : ''}`}
    >
      {/* {pending ? title : loading()} */}
      {pending ? loading() : title}
    </Button>
  )
}
