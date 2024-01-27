import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  // Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface EmailProps {
  justification: string
  studentName: string
  courseName: string
  date: string
}

const NewRequestEmail = ({
  justification,
  studentName,
  courseName,
  date,
}: EmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nova justificativa de falta - Aluno {studentName}</Preview>
      <Tailwind>
        <Body className="m-auto">
          <Container className="mx-auto my-10 border">
            <Section className="text-lg font-semibold">
              Olá, secretaria da escola.
            </Section>
            <Heading>
              Uma nova justificativa de falta foi devidamente registrada na
              plataforma Aluno Connect
            </Heading>
            <Hr />
            <Text className="flex">Aluno: {studentName}</Text>
            <Text className="flex">Turma: {courseName}</Text>
            <Text className="flex">Data da falta: {date}</Text>
            <Text className="flex">Justificativa: {justification}</Text>
            <Hr />
            <Text>
              Para aceitar ou recusar a solicitação, clique no botão abaixo:
            </Text>
            <Section className="flex justify-center">
              <Button
                href="https://aluno-connect.vercel.app/"
                className="rounded-md bg-indigo-950 p-2 px-4 text-lg font-medium text-white shadow"
              >
                Acesse Aluno Connect
              </Button>
            </Section>
            <Text className="font-bold">
              Não é necessário responder a este e-mail
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default NewRequestEmail
