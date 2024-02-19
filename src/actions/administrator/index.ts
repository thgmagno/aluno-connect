'use server'

import { StudentFormState } from '@/lib/states'
import { StudentSchema } from '@/lib/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function getStudents() {
  return prisma.user.findMany({
    where: { profile: 'STUDENT' },
    orderBy: { name: 'asc' },
  })
}

export async function getParents() {
  return prisma.user.findMany({
    where: { profile: 'PARENT' },
    orderBy: { name: 'asc' },
  })
}

export async function getInstructors() {
  return prisma.user.findMany({
    where: { profile: 'INSTRUCTOR' },
    orderBy: { name: 'asc' },
  })
}

export async function getClassrooms() {
  return prisma.classroom.findMany({
    orderBy: { course_name: 'asc' },
  })
}

export async function getRequests() {
  return prisma.request.findMany({
    orderBy: { frequency: { date: 'desc' } },
    include: { frequency: { select: { id: true, status: true, date: true } } },
  })
}

export async function updateStudent(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = StudentSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('birthdate'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.user.upsert({
      where: { email: parsed.data.email },
      update: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: parsed.data.birthdate,
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: parsed.data.birthdate,
      },
    })
  } catch (e) {
    return { errors: { _form: 'Ocorreu um erro' } }
  }

  revalidatePath('/alunos')
  redirect('/alunos')
}

export async function resetPassword(id: number) {
  return prisma.user.update({
    where: { id },
    data: { password: null },
  })
}
