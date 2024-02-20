import { Button } from '@nextui-org/button'
import { Tailwind } from '@react-email/components'
import Link from 'next/link'

interface Props {
  studentName: string
  courseName: string
  dateOfAbsense: string
  justification: string
  parentName: string
}

export const Email = ({
  studentName,
  courseName,
  dateOfAbsense,
  justification,
  parentName,
}: Props) => {
  return (
    <Tailwind>
      <span>Olá, secretaria da escola.</span>
      <h1>
        Uma nova justificativa de falta foi devidamente registrada na plataforma
        Aluno Connect
      </h1>
      <hr />
      <p>
        <span className="font-medium">Aluno</span>: {studentName}
      </p>
      <p>
        <span className="font-medium">Responsável</span>: {parentName}
      </p>
      <p>
        <span className="font-medium">Turma</span>: {courseName}
      </p>
      <p>
        <span className="font-medium">Data da falta</span>: {dateOfAbsense}
      </p>
      <p>
        <span className="font-medium">Justificativa</span>: {justification}
      </p>

      <p>
        Para aceitar ou recusar a solicitação, acesse a plataforma clicando no
        botão abaixo:
      </p>

      <Link href={'https://aluno-connect.vercel.app/'}>
        <Button color="primary" className="mx-auto">
          Aluno Connect
        </Button>
      </Link>

      <p className="font-bold">Não é necessário responder a este e-mail</p>
    </Tailwind>
  )
}
