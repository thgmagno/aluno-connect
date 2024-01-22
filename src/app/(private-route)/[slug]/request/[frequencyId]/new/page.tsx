import Querys from '@/actions/querys'
import Forms from '@/components/forms'
import { Button } from '@/components/ui/button'
import { Frequency } from '@prisma/client'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import Link from 'next/link'
import React from 'react'

// student, parent,
export default async function NewRequestPage({
  params,
}: {
  params: { frequencyId: string }
}) {
  const profile = await AuthService.getUserProfile()
  const frequency = (await Querys.Read.findUnique.EntityData(
    'frequency',
    params.frequencyId,
  )) as Frequency

  return (
    <React.Fragment>
      <section className="flex items-center justify-between">
        <h1 className="text-muted md:text-xl">Justificar falta</h1>
        <Button variant={'secondary'}>
          <Link href={paths.getEntitiesPath(profile, 'frequency')}>
            Cancelar
          </Link>
        </Button>
      </section>

      <Forms.Create.Request data={frequency} />
    </React.Fragment>
  )
}
