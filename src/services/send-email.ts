'use server'

import { SendEmailFormState } from '@/lib/states'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'

const resent = new Resend(process.env.RESEND_API_KEY)

export default async function SendEmail(
  formState: SendEmailFormState,
  formData: FormData,
): Promise<SendEmailFormState> {
  const studentName = formData.get('studentName')
  const jusitfy = formData.get('jusitfy')
  // TODO: Anexar imagem
  const picture = formData.get('picture')

  if (!jusitfy) return { errors: { justify: 'A justificativa é obrigatória' } }

  try {
    resent.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: `Justificativa de falta de ${studentName}`,
      html: `<p>${jusitfy}</p>`,
    })
    console.log('bloco try')
  } catch (e) {
    console.log('bloco catch')
    return { errors: { _form: 'Erro inesperado' } }
  }

  redirect('/aluno')
}
