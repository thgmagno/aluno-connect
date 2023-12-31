import prisma from '@/lib/prisma'
import {
  instructorSchemaValidation,
  parentSchemaValidation,
  studentSchemaValidation,
} from '@/lib/types'

type createUsersType = {
  createInstructorAccount: (formData: FormData) => void
  createStudentAccount: (formData: FormData) => void
  createParentAccount: (formData: FormData) => void
}

async function createInstructorAccount(formData: FormData) {
  const parsed = instructorSchemaValidation.safeParse({
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
async function createStudentAccount(formData: FormData) {
  const parsed = studentSchemaValidation.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('birthdate'),
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
async function createParentAccount(formData: FormData) {
  const parsed = parentSchemaValidation.safeParse({
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

const createUsers: createUsersType = {
  createInstructorAccount,
  createStudentAccount,
  createParentAccount,
}

export default createUsers
