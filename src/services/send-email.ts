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
  const studentId = formData.get('id') as string
  const studentName = formData.get('studentName') as string
  const justification = formData.get('justification') as string
  // TODO: Anexar imagem
  // const picture = formData.get('picture')

  if (!justification)
    return { errors: { justification: 'A justificativa é obrigatória' } }

  try {
    await prisma.request.create({
      data: {
        studentId,
        justification,
        date: new Date(),
      },
    })

    resent.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: `Justificativa de falta de ${studentName}`,
      html: `<p>${justification}</p>`,
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
