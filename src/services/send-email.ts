'use server'

import NewRequestEmail from '@/components/email-templates/new-request'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function SendEmail({
  studentName,
  className,
  studentEmail,
  frequencyDate,
  justification,
}: {
  studentName: string
  className: string
  studentEmail: string
  frequencyDate: string
  justification: string
}) {
  try {
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: `Justificativa de falta - Aluno: ${studentName}`,
      react: NewRequestEmail({
        studentName,
        studentEmail,
        className,
        frequencyDate,
        justification,
      }),
    })
  } catch (e) {
    return { success: false }
  }

  return { success: true }
}
