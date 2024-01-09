import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'

export default function SignOutForm() {
  async function logout() {
    'use server'
    cookies().delete('session-aluno-connect')
  }

  return (
    <form action={logout}>
      <Button variant={'destructive'}>Finalizar sessão</Button>
    </form>
  )
}
