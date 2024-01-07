import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'

export default function Header() {
  return (
    <form
      action={async () => {
        'use server'
        cookies().delete('session-aluno-connect')
      }}
    >
      <Button variant={'destructive'}>Finalizar sessão</Button>
    </form>
  )
}
