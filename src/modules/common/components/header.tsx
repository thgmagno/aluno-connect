import { Button } from '@/components/ui/button'
import AuthService from '@/modules/auth/services/auth-service'
import { cookies } from 'next/headers'

export default async function Header() {
  const session = cookies().get('session-aluno-connect')
  if (!session) return
  const { name } = await AuthService.openSessionToken(session.value)

  return (
    <header className="flex h-16 items-center justify-between px-4">
      <h1>Nome: {name as string}</h1>
      <form
        action={async () => {
          'use server'
          cookies().delete('session-aluno-connect')
        }}
      >
        <Button variant={'destructive'}>Finalizar sessão</Button>
      </form>
    </header>
  )
}
