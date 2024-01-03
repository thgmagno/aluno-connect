import prisma from '@/lib/prisma'
import {
  instructorRegistrationSchema,
  parentRegistrationSchema,
  studentRegistrationSchema,
} from '@/lib/types'

type createUsersType = {
  instructorAccount: (formData: FormData) => void
  studentAccount: (formData: FormData) => void
  parentAccount: (formData: FormData) => void
}

async function instructorAccount(formData: FormData) {
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
async function studentAccount(formData: FormData) {
  const parsed = studentRegistrationSchema.safeParse({
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
async function parentAccount(formData: FormData) {
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

const CreateActions: createUsersType = {
  instructorAccount,
  studentAccount,
  parentAccount,
}

export default CreateActions