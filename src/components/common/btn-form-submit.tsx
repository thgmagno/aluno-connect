'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

export default function BtnFormSubmit({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus()

  const button = () => (
    <Button
      type="submit"
      variant={'primary'}
      className="w-full"
      style={{ userSelect: 'none' }}
    >
      {children}
    </Button>
  )

  const loading = () => (
    <Button
      type="submit"
      variant={'primary'}
      className="w-full"
      style={{ userSelect: 'none' }}
      disabled
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Aguarde
    </Button>
  )

  return <>{pending ? loading() : button()}</>
}
