import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'

export default function EndSessionForm() {
  return (
    <form
      action={async () => {
        'use server'

        cookies().delete('session-aluno-connect')
      }}
    >
      <Button type="submit" variant="destructive" className="w-full">
        Finalizar
      </Button>
    </form>
  )
}
