'use server'

import {
  ClassroomFormState,
  InstructorFormState,
  ParentFormState,
  StudentFormState,
} from '@/lib/states'
import {
  ClassroomSchema,
  InstructorSchema,
  ParentSchema,
  StudentSchema,
} from '@/lib/schema'
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

export async function upsertStudent(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = StudentSchema.safeParse({
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
        birthdate: new Date(parsed.data.birthdate),
        profile: 'STUDENT',
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: new Date(parsed.data.birthdate),
        profile: 'STUDENT',
      },
    })
  } catch (e) {
    return { errors: { _form: 'Ocorreu um erro' } }
  }

  revalidatePath('/alunos')
  redirect('/alunos')
}

export async function upsertParent(
  formState: ParentFormState,
  formData: FormData,
): Promise<ParentFormState> {
  const parsed = ParentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
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
        birthdate: null,
        profile: 'PARENT',
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: null,
        profile: 'PARENT',
      },
    })
  } catch (e) {
    return { errors: { _form: 'Ocorreu um erro' } }
  }

  revalidatePath('/responsaveis')
  redirect('/responsaveis')
}

export async function upsertInstructor(
  formState: InstructorFormState,
  formData: FormData,
): Promise<InstructorFormState> {
  const parsed = InstructorSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
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
        birthdate: null,
        profile: 'INSTRUCTOR',
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: null,
        profile: 'INSTRUCTOR',
      },
    })
  } catch (e) {
    return { errors: { _form: 'Ocorreu um erro' } }
  }

  revalidatePath('/instrutores')
  redirect('/instrutores')
}

export async function upsertClassroom(
  formState: ClassroomFormState,
  formData: FormData,
): Promise<ClassroomFormState> {
  const parsed = ClassroomSchema.safeParse({
    id: formData.get('id'),
    course_name: formData.get('courseName'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.classroom.upsert({
      where: { id: Number(parsed.data.id) },
      update: {
        course_name: parsed.data.course_name,
      },
      create: {
        course_name: parsed.data.course_name,
      },
    })
  } catch (e) {
    if (e instanceof Error)
      return {
        errors: {
          _form: 'Ocorreu um erro',
        },
      }
  }

  revalidatePath('/turmas')
  redirect('/turmas')
}

export async function acceptRequest(id: number) {
  try {
    await prisma.request
      .findFirst({
        where: { id },
        select: { frequency_id: true },
      })
      .then(
        async (request) =>
          await prisma.frequency.update({
            where: { id: request?.frequency_id, status: 'PENDING' },
            data: { status: 'APPROVED' },
          }),
      )
  } catch (e) {
    return { errors: { _form: 'Erro ao atualizar dados' } }
  }

  revalidatePath('/solicitacoes')
  redirect('/solicitacoes')
}

export async function rejectRequest(id: number) {
  try {
    await prisma.request
      .findFirst({
        where: { id },
        select: { frequency_id: true },
      })
      .then(
        async (request) =>
          await prisma.frequency.update({
            where: { id: request?.frequency_id, status: 'PENDING' },
            data: { status: 'REJECTED' },
          }),
      )
  } catch (e) {
    return { errors: { _form: 'Erro ao atualizar dados' } }
  }

  revalidatePath('/solicitacoes')
  redirect('/solicitacoes')
}

export async function resetPassword(id: number) {
  return prisma.user.update({
    where: { id },
    data: { password: null },
  })
}

export async function deleteUser(id: number) {
  return prisma.user
    .findUniqueOrThrow({
      where: { id },
    })
    .then((user) =>
      prisma.user.delete({
        where: { id: user.id },
      }),
    )
    .then(() => revalidatePath('/', 'page'))
}

export async function deleteClassroom(id: number) {
  return prisma.classroom
    .findUniqueOrThrow({
      where: { id },
    })
    .then((classroom) =>
      prisma.classroom.delete({
        where: { id: classroom.id },
      }),
    )
    .then(() => revalidatePath('/turmas'))
}
