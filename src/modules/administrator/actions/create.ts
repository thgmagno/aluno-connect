'use server'

import prisma from '@/lib/prisma'
import {
  instructorRegistrationSchema,
  parentRegistrationSchema,
  studentRegistrationSchema,
} from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function createInstructorAccount(formData: FormData) {
  const parsed = instructorRegistrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + '. '
    })

    return {
      error: errorMessage,
    }
  }

  try {
    await prisma.instructor.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })

    revalidatePath('/instrutores')
    return { success: 'Usuário criado com sucesso.' }
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        error:
          'Este e-mail já existe em nossa base de dados. Tente com outro diferente.',
      }
    } else {
      return { error: 'Não foi possível concluir o cadastro.' }
    }
  }
}
export async function createStudentAccount(formData: FormData) {
  const birthdate = new Date(formData.get('birthdate') as string)
  if (!birthdate.getDate()) return { error: 'Preencha todos os campos' }

  const parsed = studentRegistrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate,
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + '. '
    })

    return {
      error: errorMessage,
    }
  }

  try {
    await prisma.student.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: parsed.data.birthdate,
      },
    })

    revalidatePath('/alunos')

    return {
      success: 'Usuário criado com sucesso.',
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        error:
          'Este e-mail já existe em nossa base de dados. Tente com outro diferente.',
      }
    } else {
      return { error: 'Não foi possível concluir o cadastro.' }
    }
  }
}
export async function createParentAccount(formData: FormData) {
  const parsed = parentRegistrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + '. '
    })

    return {
      error: errorMessage,
    }
  }

  try {
    await prisma.parent.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    })

    revalidatePath('/responsaveis')

    return {
      success: 'Usuário criado com sucesso.',
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        error:
          'Este e-mail já existe em nossa base de dados. Tente com outro diferente.',
      }
    } else {
      return { error: 'Não foi possível concluir o cadastro.' }
    }
  }
}
