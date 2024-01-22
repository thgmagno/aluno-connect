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

  const button = () => (
    <Button
      type="submit"
      variant={variant ?? 'primary'}
      className="w-full"
      style={{ userSelect: 'none' }}
      size={size ?? 'default'}
    >
      {children}
    </Button>
  )

  const loading = () => (
    <Button
      type="submit"
      variant={variant ?? 'primary'}
      className="w-full"
      style={{ userSelect: 'none' }}
      size={size ?? 'default'}
      disabled
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Aguarde
    </Button>
  )

  return <>{pending ? loading() : button()}</>
}
