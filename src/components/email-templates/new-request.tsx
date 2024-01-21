import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  // Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface EmailProps {
  justification: string
  studentName: string
  className: string
  studentEmail: string
  frequencyDate: string
}

const NewRequestEmail = ({
  justification,
  studentName,
  className,
  frequencyDate,
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
            <Text className="flex">Turma: {className}</Text>
            <Text className="flex">Data da falta: {frequencyDate}</Text>
            <Text className="flex">Justificativa: {justification}</Text>
            <Hr />
            <Text className="flex gap-1">
              Para aceitar ou recusar a solicitação, acesse
              <Link href="https://aluno-connect.vercel.app/">
                Aluno Connect
              </Link>
              .
            </Text>
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
