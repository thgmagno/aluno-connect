'use server'

import {
  ClassroomFormState,
  InstructorFormState,
  LinkInstructorClassroomFormState,
  LinkStudentClassroomFormState,
  LinkStudentParentFormState,
  ParentFormState,
  SetCategoryFormState,
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
import { ParseInt } from '@/utils/parse-int'
import { mockCategories } from '@/lib/mock'

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

export async function linkStudentClassroom(
  formState: LinkStudentClassroomFormState,
  formData: FormData,
): Promise<LinkStudentClassroomFormState> {
  try {
    const classroomId = ParseInt(formData.get('classroomId') as string)
    const studentIDs = Array.from(formData.getAll('studentList'), (student) =>
      Number(student),
    )

    await prisma.studentClassroom.upsert({
      where: { classroom_id: classroomId },
      update: { students_id: studentIDs },
      create: { classroom_id: classroomId, students_id: studentIDs },
    })
  } catch (e) {
    return { errors: { _form: 'Erro ao vincular dados' } }
  }

  revalidatePath('/turmas')
  redirect('/turmas')
}

export async function linkInstructorClassroom(
  formState: LinkInstructorClassroomFormState,
  formData: FormData,
): Promise<LinkInstructorClassroomFormState> {
  try {
    const classroomId = ParseInt(formData.get('classroomId') as string)
    const instructorIDs = Array.from(
      formData.getAll('instructorList'),
      (instructor) => Number(instructor),
    )

    await prisma.instructorClassroom.upsert({
      where: { classroom_id: classroomId },
      update: { instructors_id: instructorIDs },
      create: { classroom_id: classroomId, instructors_id: instructorIDs },
    })
  } catch (e) {
    return { errors: { _form: 'Erro ao vincular dados' } }
  }

  revalidatePath('/turmas')
  redirect('/turmas')
}

export async function linkStudentParent(
  formState: LinkStudentParentFormState,
  formData: FormData,
): Promise<LinkStudentParentFormState> {
  try {
    const parentId = ParseInt(formData.get('parentId') as string)
    const studentIDs = Array.from(formData.getAll('studentList'), (student) =>
      Number(student),
    )

    await prisma.studentParent.upsert({
      where: { parent_id: parentId },
      update: { students_id: studentIDs },
      create: { parent_id: parentId, students_id: studentIDs },
    })
  } catch (e) {
    return { errors: { _form: 'Erro ao vincular dados' } }
  }

  revalidatePath('/responsaveis')
  redirect('/responsaveis')
}

export async function setCategory(
  formState: SetCategoryFormState,
  formData: FormData,
): Promise<SetCategoryFormState> {
  try {
    const id = ParseInt(formData.get('id') as string)
    const categoryId = ParseInt(formData.get('category') as string)

    const category = mockCategories.find(
      (category) => category.value === categoryId,
    )

    if (category?.label) {
      await prisma.request.update({
        where: { id },
        data: { category: category.label },
      })
    }
  } catch (error) {
    return { errors: { _form: 'Não foi possível incluir a categoria' } }
  }

  revalidatePath('/solicitacoes')
  redirect('/solicitacoes')
}
