'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

interface BtnFormSubmitProps {
  children: ReactNode
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  variant?:
    | 'default'
    | 'link'
    | 'primary'
    | 'emerald'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
}

export default function BtnFormSubmit({
  children,
  size,
  variant,
}: BtnFormSubmitProps) {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <Button
        type="submit"
        className="w-full"
        disabled
        style={{ userSelect: 'none' }}
        variant={variant ?? 'primary'}
        size={size ?? 'default'}
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Aguarde
      </Button>
    )
  }

  return (
    <Button
      type="submit"
      className="w-full"
      style={{ userSelect: 'none' }}
      variant={variant ?? 'primary'}
      size={size ?? 'default'}
    >
      {children}
    </Button>
  )
}
