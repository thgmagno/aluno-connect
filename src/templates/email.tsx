import { Tailwind, Button, Container } from '@react-email/components'

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
      <Container className="flex max-w-sm flex-col">
        <h1>
          Uma nova justificativa de falta foi devidamente registrada na
          plataforma Aluno Connect
        </h1>

        <hr />
        <p>
          <span className="font-bold">Aluno</span>: {studentName}
        </p>
        <p>
          <span className="font-bold">Responsável</span>: {parentName}
        </p>
        <p>
          <span className="font-bold">Turma</span>: {courseName}
        </p>
        <p>
          <span className="font-bold">Data da falta</span>: {dateOfAbsense}
        </p>
        <p>
          <span className="font-bold">Justificativa</span>: {justification}
        </p>
        <hr />

        <h3>
          Para aceitar ou recusar a solicitação, acesse a plataforma clicando no
          link abaixo:
        </h3>

        <div className="flex items-center justify-center">
          <Button
            href={'https://aluno-connect.vercel.app/'}
            className="my-5 rounded-full bg-indigo-900 p-2 px-4 text-xl text-neutral-100"
          >
            Aluno Connect
          </Button>
        </div>
        <p className="font-bold">Não é necessário responder a este e-mail</p>
      </Container>
    </Tailwind>
  )
}
