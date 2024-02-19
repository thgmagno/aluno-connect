'use client'

import { Button } from '@nextui-org/button'
import { useFormStatus } from 'react-dom'

export default function FormSubmit({ title }: { title: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" color="primary" isLoading={pending}>
      {title}
    </Button>
  )
}
