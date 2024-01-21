'use server'

import prisma from '@/lib/prisma'
import { RequestFormState } from '@/lib/states'
import { requestSchema } from '@/lib/types'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import SendEmail from '@/services/send-email'
import { redirect } from 'next/navigation'

export async function request(
  formState: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> {
  const profile = await AuthService.getUserProfile()
  const parsed = requestSchema.safeParse({
    frequencyId: formData.get('frequencyId'),
    studentId: formData.get('studentId'),
    justification: formData.get('justification'),
    media: formData.get('media'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  console.log('chamou! parsed success, frequency')

  try {
    const [student, frequency] = await Promise.all([
      prisma.student.findFirst({ where: { id: parsed.data.studentId } }),
      prisma.frequency.findFirst({
        where: { id: parsed.data.frequencyId },
        include: { classID: true },
      }),
      prisma.frequency.update({
        where: { id: parsed.data.frequencyId },
        data: { status: 'PENDING' },
      }),
      prisma.request.create({
        data: {
          justification: parsed.data.justification,
          studentId: parsed.data.studentId,
          frequencyId: parsed.data.frequencyId,
        },
      }),
    ])

    // Enviar e-mail...
    SendEmail({
      studentName: student?.name as string,
      studentEmail: student?.email as string,
      className: frequency?.classID.course_name as string,
      frequencyDate: frequency?.date.toLocaleDateString('pt-br', {
        dateStyle: 'long',
      }) as string,
      justification: parsed.data.justification,
    })
  } catch (e) {
    return { errors: { _form: ['Não foi possível criar a solicitação'] } }
  }

  redirect(paths.getEntitiesPath(profile, 'frequency'))
}
