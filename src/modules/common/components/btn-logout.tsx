import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { cookies } from 'next/headers'

export default function BtnLogout() {
  return (
    <form
      action={async () => {
        'use server'
        cookies().delete('session-aluno-connect')
      }}
    >
      <Button
        variant={'destructive'}
        type="submit"
        className="hidden rounded-full bg-transparent md:flex"
      >
        Encerrar sessão
      </Button>
      <Button
        variant={'destructive'}
        type="submit"
        className="flex rounded-full bg-transparent md:hidden"
      >
        <LogOut />
      </Button>
    </form>
  )
}
