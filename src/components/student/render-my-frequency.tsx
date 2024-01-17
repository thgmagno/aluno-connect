import * as Table from '@/components/common/table'
import { cookies } from 'next/headers'
import AuthService from '@/services/auth-service'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Badge } from '../ui/badge'

export default async function RenderStudentFrequency() {
  // recupera o ID do aluno logado
  const session = cookies().get('session-aluno-connect')
  if (!session) return
  const { sub } = await AuthService.openSessionToken(session.value)

  // recupera a frequencia desse aluno
  const frequency = await prisma.frequency.findMany({
    where: { studentId: sub },
    include: { requestID: true },
    orderBy: { date: 'desc' },
  })

  const Flag = ({
    status,
  }: {
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
  }) => {
    if (status === 'APPROVED')
      return (
        <Badge className="cursor-default" variant={'primary'}>
          Justificativa aceita
        </Badge>
      )
    if (status === 'PENDING')
      return (
        <Badge className="cursor-default" variant={'pending'}>
          Justificativa pendente
        </Badge>
      )
    if (status === 'REJECTED')
      return (
        <Badge className="cursor-default" variant={'destructive'}>
          Justificativa rejeitada
        </Badge>
      )
  }

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
                  {freq.status ? (
                    <Badge variant={'primary'}>presente</Badge>
                  ) : (
                    <Badge variant={'destructive'}>faltou</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {freq.status ? (
                    ''
                  ) : freq.requestID ? (
                    <Flag status={freq.requestID.status} />
                  ) : (
                    <Link href={`/aluno/justificar/${freq.id}`}>
                      <Badge variant={'pending'}>Justificar</Badge>
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
