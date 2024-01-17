'use server'

import prisma from '@/lib/prisma'
import { SendEmailFormState } from '@/lib/states'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'

const resent = new Resend(process.env.RESEND_API_KEY)

export default async function SendEmail(
  formState: SendEmailFormState,
  formData: FormData,
): Promise<SendEmailFormState> {
  const frequencyId = formData.get('frequencyId') as string
  const studentId = formData.get('studentId') as string
  const studentName = formData.get('studentName') as string
  const justification = formData.get('justification') as string
  // TODO: Anexar imagem
  // const picture = formData.get('picture')

  if (!justification)
    return { errors: { justification: 'A justificativa é obrigatória' } }

  try {
    const req = await prisma.request.create({
      data: {
        studentId,
        justification,
        date: new Date(),
      },
      include: { Frequency: true },
    })

    await prisma.frequency.update({
      data: { requestId: req.id },
      where: { id: frequencyId },
    })

    resent.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: `Justificativa de Falta - Aluno(a) ${studentName}`,
      html: `
      <p>A justificativa de falta foi devidamente registrada na plataforma Aluno Connect, conforme as informações a seguir:</p>
      <b>Aluno</b>: [Nome do Aluno]
      <b>Turma</b>: [Turma]
      <b>Data da Falta</b>: [Data da Falta]
      <p><b>Justificativa:</b>${justification}</p>
      <p>Não é necessário responder a este e-mail.</p>
      <p>Para <b>aceitar</b> ou <b>recusar</b> a solicitação, solicitamos que acesse a plataforma Aluno Connect</p>
      `,
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        errors: {
          _form: 'Já existe uma justificativa para a data selecionada',
        },
      }
    } else {
      return { errors: { _form: 'Erro inesperado' } }
    }
  }

  redirect('/aluno')
}
