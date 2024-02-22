'use server'

import { prisma } from '@/lib/prisma'
import { RequestFormState } from '@/lib/states'
import { RequestSchema } from '@/lib/schema'
import { resend } from '@/lib/resend'
import { Email } from '@/templates/email'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ParseInt } from '@/utils/parse-int'

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
    student_id: formData.get('student_id'),
    student_name: formData.get('student_name'),
    parent_id: formData.get('parent_id'),
    frequency_id: formData.get('frequency_id'),
    justification: formData.get('justification'),
    course_name: formData.get('course_name'),
    classroom_id: formData.get('classroom_id'),
    dateOfAbsense: formData.get('dateOfAbsense'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const updateFrequency = prisma.frequency.update({
      where: { id: Number(parsed.data.frequency_id) },
      data: { status: 'PENDING' },
    })

    let parent: { name: string } | null = null

    if (parsed.data.parent_id) {
      parent = await prisma.user.findFirst({
        where: { id: ParseInt(parsed.data.parent_id) },
        select: { name: true },
      })
    }

    let student: { name: string } | null = null

    if (!parsed.data.student_name) {
      student = await prisma.user.findFirst({
        where: { id: ParseInt(parsed.data.student_id) },
        select: { name: true },
      })
    }

    const sendEmail = resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'secretaria.alunoconnect@gmail.com',
      subject: `Justificativa de falta de ${student?.name || parsed.data.student_name} - Aluno Connect`,
      react: Email({
        studentName: student?.name || parsed.data.student_name,
        parentName: parent?.name || 'Não informado',
        courseName: parsed.data.course_name,
        justification: parsed.data.justification,
        dateOfAbsense: new Date(parsed.data.dateOfAbsense).toLocaleDateString(
          'pt-br',
          { dateStyle: 'long' },
        ),
      }),
    })

    const createRequest = prisma.request.create({
      data: {
        course_name: parsed.data.course_name,
        justification: parsed.data.justification,
        student_name: student?.name || parsed.data.student_name,
        imageUrl: '',
        student_id: Number(parsed.data.student_id),
        parent_id: Number(parsed.data.parent_id),
        frequency_id: Number(parsed.data.frequency_id),
      },
    })

    await Promise.all([updateFrequency, sendEmail, createRequest])
  } catch (e) {
    if (e instanceof Error) {
      return { errors: { _form: 'Falha na requisição' } }
    }
  }

  revalidatePath('/minhas-turmas', 'page')
  redirect(`/minhas-turmas/${parsed.data.classroom_id}`)
}
