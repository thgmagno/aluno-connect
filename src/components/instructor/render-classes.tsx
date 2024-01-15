import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'

export default async function RenderClasses() {
  // recupera o ID do instrutor logado
  const session = cookies().get('session-aluno-connect')
  if (!session) return
  const { sub } = await AuthService.openSessionToken(session.value)

  // recupera a lista de turmas onde o professor está marcado
  const classes = await prisma.instructorClass.findMany({
    where: { instructorId: sub },
    include: { classID: true },
  })

  return (
    <>
      {!classes.length ? (
        <p className="text-center text-xl text-muted-foreground">
          Não há registros de turmas nesse momento
        </p>
      ) : (
        <div className="mx-auto w-full max-w-lg rounded bg-zinc-200 p-2 shadow-lg">
          <h1 className="text-lg text-muted-foreground">Minhas turmas:</h1>
          <section>
            {classes.map((row) => (
              <React.Fragment key={row.id}>
                <Link
                  href={`/instrutor/turmas/${row.classID.id}`}
                  className="my-1 flex w-full justify-between rounded p-2 hover:bg-indigo-950 hover:text-neutral-200"
                >
                  <div className="truncate pr-4">{row.classID.course_name}</div>
                  <ArrowRight size={20} />
                </Link>
              </React.Fragment>
            ))}
          </section>
        </div>
      )}
    </>
  )
}
