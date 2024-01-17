import { Check, X } from 'lucide-react'
import * as Table from '@/components/common/table'
import { cookies } from 'next/headers'
import AuthService from '@/services/auth-service'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function RenderStudentFrequency() {
  // recupera o ID do aluno logado
  const session = cookies().get('session-aluno-connect')
  if (!session) return
  const { sub } = await AuthService.openSessionToken(session.value)

  // recupera a frequencia desse aluno
  const frequency = await prisma.frequency.findMany({
    where: { studentId: sub },
    orderBy: { date: 'desc' },
  })

  return (
    <>
      {!frequency.length ? (
        <p className="text-center text-xl text-muted-foreground">
          Não há registros de frequência nesse momento
        </p>
      ) : (
        <Table.Content>
          <Table.Header>
            <Table.Cell>Data</Table.Cell>
            <Table.Cell>Situação</Table.Cell>
            <Table.Cell>Ações</Table.Cell>
          </Table.Header>
          <Table.Body>
            {frequency.map((freq) => (
              <Table.Row key={freq.id}>
                <Table.Cell>{freq.date.toLocaleDateString('pt-br')}</Table.Cell>
                <Table.Cell>
                  <p className="flex w-full justify-center">
                    {freq.status ? (
                      <Check
                        strokeWidth={5}
                        className="rounded bg-green-600 p-1 text-slate-100"
                      />
                    ) : (
                      <X
                        strokeWidth={5}
                        className="rounded bg-red-600 p-1 text-slate-100"
                      />
                    )}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  {freq.status ? (
                    '-'
                  ) : (
                    <Link
                      href="/aluno/justificar"
                      className="rounded-md bg-amber-500 px-2 py-1 text-neutral-100"
                    >
                      Jusitificar
                    </Link>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      )}
    </>
  )
}
