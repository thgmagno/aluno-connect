'use server'

import NewRequestEmail from '@/components/email-templates/new-request'
import db from '@/db'
import { RequestFormState } from '@/lib/states'
import { requestSchema } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function SendJustification(
  formState: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> {
  const parsed = requestSchema.safeParse({
    frequencyId: formData.get('frequencyId'),
    courseName: formData.get('courseName'),
    studentId: formData.get('studentId'),
    studentName: formData.get('studentName'),
    frequencyDate: formData.get('frequencyDate'),
    justification: formData.get('justification'),
  })

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }

  const promises = [
    db.frequency.update({
      where: { id: parsed.data.frequencyId },
      data: { status: 'PENDING' },
    }),
    db.request.create({
      data: {
        justification: parsed.data.justification,
        studentId: parsed.data.studentId,
        frequencyId: parsed.data.frequencyId,
      },
    }),
  ]

  try {
    // atualizar tabelas
    await Promise.all(promises)

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: `Justificativa de falta - Aluno: ${parsed.data.studentName}`,
      react: NewRequestEmail({
        studentName: parsed.data.studentName,
        courseName: parsed.data.courseName,
        date: new Date(parsed.data.frequencyDate).toLocaleDateString('pt-br', {
          dateStyle: 'long',
        }),
        justification: parsed.data.justification,
      }),
    })
  } catch (e) {
    if (e instanceof Error)
      return { errors: { _form: ['Ops, ocorreu um erro: ' + e?.message] } }
  }

  revalidatePath('/')
  redirect('/')
}
