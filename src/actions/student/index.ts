'use server'

import { prisma } from '@/lib/prisma'
import { RequestFormState } from '@/lib/states'
import { RequestSchema } from '@/lib/schema'
import { resend } from '@/lib/resend'

export async function getClassroom(id: number) {
  const promises = await prisma.studentClassroom
    .findMany({
      where: { students_id: { has: id } },
      select: { classroom_id: true },
    })
    .then((list) =>
      list.map((item) =>
        prisma.classroom.findUnique({
          where: { id: item.classroom_id },
        }),
      ),
    )

  return Promise.all(promises)
}

export async function getFrequency(studentId: number, classroomId: number) {
  return prisma.frequency.findMany({
    where: { student_id: studentId, classroom_id: classroomId },
    orderBy: { date: 'desc' },
  })
}

export async function sendJustification(
  formState: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> {
  const parsed = RequestSchema.safeParse({
    student_id: formData.get(''),
    student_name: formData.get(''),
    parent_id: formData.get(''),
    frequency_id: formData.get(''),
    justification: formData.get(''),
    course_name: formData.get(''),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const updateFrequency = prisma.frequency.update({
      where: { id: Number(parsed.data.frequency_id) },
      data: { status: 'PENDING' },
    })

    // TODO: Corrigir o nome da turma...
    const sendEmail = resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: 'Justificativa de falta - Aluno Connect',
      html: `<body style="margin: auto; text-align: center; max-width: 600px; padding: 20px; border: 1px solid #000;"><div style="font-size: 18px; font-weight: bold;">Olá, secretaria da escola.</div><h1>Uma nova justificativa de falta foi devidamente registrada na plataforma Aluno Connect</h1><hr><p style="display: flex;">Aluno: <span>${parsed.data.student_name}</span></p><p style="display: flex;">Turma: <span>${parsed.data.student_id}</span></p><p style="display: flex;">Data da falta: <span>_</span></p><p style="display: flex;">Justificativa: <span>${parsed.data.justification}</span></p><hr><p>Para aceitar ou recusar a solicitação, clique no botão abaixo:</p><div style="text-align: center; margin: 30px 0;"><a href="https://aluno-connect.vercel.app/" style="text-decoration: none; background-color: #4B5563; color: #FFFFFF; padding: 8px 16px; border-radius: 4px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Aluno Connect</a></div><p style="font-weight: bold;">Não é necessário responder a este e-mail</p></body>`,
    })

    await Promise.all([updateFrequency, sendEmail])
  } catch (e) {
    return { errors: { _form: 'Falha ao enviar' } }
  }

  await prisma.request.create({
    data: {
      course_name: '',
      justification: '',
      student_name: '',
      imageUrl: '',
      student_id: Number(parsed.data.student_id),
      parent_id: Number(parsed.data.parent_id),
      frequency_id: Number(parsed.data.frequency_id),
    },
  })

  return { errors: {} }
}
