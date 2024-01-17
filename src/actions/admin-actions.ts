'use server'

import prisma from '@/lib/prisma'
import {
  ClassFormState,
  InstructorFormState,
  ParentFormState,
  StudentFormState,
} from '@/lib/states'
import {
  classSchema,
  studentSchema,
  instructorSchema,
  parentSchema,
  UserType,
} from '@/lib/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createStudent(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = studentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('birthdate'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.student.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: new Date(parsed.data.birthdate).toISOString(),
      },
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return { errors: { email: ['Ops! Esse e-mail já está registrado'] } }
    } else {
      return {
        errors: {
          _form: ['Não foi possível realizar o cadastro'],
        },
      }
    }
  }

  redirect('/administrador/alunos')
}

export async function createInstructor(
  formState: InstructorFormState,
  formData: FormData,
): Promise<InstructorFormState> {
  const parsed = instructorSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.instructor.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return { errors: { email: ['Ops! Esse e-mail já está registrado'] } }
    } else {
      return {
        errors: {
          _form: ['Não foi possível realizar o cadastro'],
        },
      }
    }
  }

  redirect('/administrador/instrutores')
}

export async function createParent(
  formState: InstructorFormState,
  formData: FormData,
): Promise<InstructorFormState> {
  const parsed = parentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.parent.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return { errors: { email: ['Ops! Esse e-mail já está registrado'] } }
    } else {
      return {
        errors: {
          _form: ['Não foi possível realizar o cadastro'],
        },
      }
    }
  }

  redirect('/administrador/responsaveis')
}

export async function createClass(
  formState: ClassFormState,
  formData: FormData,
): Promise<ClassFormState> {
  const parsed = classSchema.safeParse({
    course_name: formData.get('course_name'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.class.create({
      data: {
        course_name: parsed.data.course_name,
      },
    })
  } catch (e) {
    return {
      errors: {
        _form: ['Não foi possível realizar o cadastro'],
      },
    }
  }

  redirect('/administrador/turmas')
}

export async function updateStudent(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = studentSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('birthdate'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.student.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: new Date(parsed.data.birthdate).toISOString(),
      },
    })
  } catch (e) {
    return { errors: { _form: ['Não foi possível atualizar os dados'] } }
  }

  redirect('/administrador/alunos')
}

export async function updateInstructor(
  formState: InstructorFormState,
  formData: FormData,
): Promise<InstructorFormState> {
  const parsed = instructorSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.instructor.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })
  } catch (e) {
    return { errors: { _form: ['Não foi possível atualizar os dados'] } }
  }

  redirect('/administrador/instrutores')
}

export async function updateParent(
  formState: ParentFormState,
  formData: FormData,
): Promise<ParentFormState> {
  const parsed = parentSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.parent.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })
  } catch (e) {
    return { errors: { _form: ['Não foi possível atualizar os dados'] } }
  }

  redirect('/administrador/responsaveis')
}

export async function updateClass(
  formState: ClassFormState,
  formData: FormData,
): Promise<ClassFormState> {
  const parsed = classSchema.safeParse({
    id: formData.get('id'),
    course_name: formData.get('course_name'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.class.update({
      where: { id: parsed.data.id },
      data: {
        course_name: parsed.data.course_name,
      },
    })
  } catch (e) {
    return { errors: { _form: ['Não foi possível atualizar os dados'] } }
  }

  redirect('/administrador/turmas')

  return {
    errors: {},
  }
}

export async function removeRecord({
  id,
  category,
}: {
  id: string
  category: 'student' | 'parent' | 'instructor' | 'class'
}) {
  if (category === 'student') {
    try {
      await prisma.student.delete({
        where: { id },
      })
    } catch (e) {
      return { error: 'Não foi possível fazer a exclusão do aluno' }
    }

    revalidatePath('/administrador/alunos')

    return { message: 'Registro excluído com sucesso!' }
  }

  if (category === 'instructor') {
    try {
      await prisma.instructor.delete({
        where: { id },
      })
    } catch (e) {
      return { error: 'Não foi possível fazer a exclusão do aluno' }
    }

    revalidatePath('/administrador/instrutores')

    return { message: 'Registro excluído com sucesso!' }
  }

  if (category === 'parent') {
    try {
      await prisma.parent.delete({
        where: { id },
      })
    } catch (e) {
      return { error: 'Não foi possível fazer a exclusão do responsável' }
    }

    revalidatePath('/administrador/responsaveis')

    return { message: 'Registro excluído com sucesso!' }
  }

  if (category === 'class') {
    try {
      await prisma.class.delete({ where: { id } })
    } catch (e) {
      return { error: 'Não foi possível fazer a exclusão da turma' }
    }

    revalidatePath('administrador/turmas')

    return { message: 'Registro excluído com sucesso!' }
  }
}

export async function resetPassword({
  id,
  profile,
}: {
  id: string
  profile: UserType
}) {
  if (profile === 'student') {
    try {
      await prisma.student.update({
        where: { id },
        data: {
          password: null,
          firstAccess: true,
        },
      })
    } catch (e) {
      return { error: 'Não foi possível resetar a senha' }
    }

    return { message: 'Senha resetada com sucesso' }
  }

  if (profile === 'instructor') {
    try {
      await prisma.instructor.update({
        where: { id },
        data: {
          password: null,
          firstAccess: true,
        },
      })
    } catch (e) {
      return { error: 'Não foi possível resetar a senha' }
    }

    return { message: 'Senha resetada com sucesso' }
  }

  if (profile === 'parent') {
    try {
      await prisma.parent.update({
        where: { id },
        data: {
          password: null,
          firstAccess: true,
        },
      })
    } catch (e) {
      return { error: 'Não foi possível resetar a senha' }
    }

    return { message: 'Senha resetada com sucesso' }
  }
}

// TODO: Essa função tambem será usada por Instrutores
export async function getRecordByID({
  id,
  category,
}: {
  id: string
  category: 'student' | 'parent' | 'instructor' | 'class'
}) {
  if (category === 'student') {
    const student = await prisma.student.findUnique({
      where: { id },
    })

    return { student }
  } else if (category === 'instructor') {
    const instructor = await prisma.instructor.findUnique({
      where: { id },
    })

    return { instructor }
  } else if (category === 'parent') {
    const parent = await prisma.parent.findUnique({
      where: { id },
    })

    return { parent }
  } else {
    const _class = await prisma.class.findUnique({
      where: { id },
    })

    return { _class }
  }
}

export async function approveAbsenceJustification(formData: FormData) {
  const requestId = formData.get('requestId') as string

  try {
    await prisma.request.update({
      where: { id: requestId },
      data: { status: 'APPROVED' },
    })
  } catch (e) {
    return console.log(e)
  }

  revalidatePath('/administrador/solicitacoes')
}

export async function rejectAbsenceJustification(formData: FormData) {
  const requestId = formData.get('requestId') as string

  try {
    await prisma.request.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    })
  } catch (e) {
    return console.log(e)
  }

  revalidatePath('/administrador/solicitacoes')
}
