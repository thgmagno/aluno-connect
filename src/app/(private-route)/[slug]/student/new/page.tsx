import Forms from '@/components/forms'
import { Button } from '@/components/ui/button'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import Link from 'next/link'
import React from 'react'

// administrator
export default async function NewStudentsPage() {
  const profile = await AuthService.getUserProfile()

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Criar novo estudante</h1>
        <Button variant={'secondary'}>
          <Link href={paths.getEntitiesPath(profile, 'student')}>Cancelar</Link>
        </Button>
      </section>

      <Forms.Create.Student />
    </React.Fragment>
  )
}
