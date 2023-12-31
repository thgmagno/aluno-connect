'use server'

import prisma from '@/lib/prisma'
import { administratorLoginSchema } from '@/lib/types'
import * as bcrypt from 'bcrypt'

// export async function authenticateInstructor(formData: FormData) {}

// export async function authenticateStudent(formData: FormData) {}

// export async function authenticateParent(formData: FormData) {}

export async function authenticateAdministrator(formData: FormData) {
  const parsed = administratorLoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
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
    const user = await prisma.administrator.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (!user) {
      return {
        error: 'E-mail não encontrado, tente novamente.',
      }
    }

    const isMatchPassword = await bcrypt.compare(
      parsed.data.password,
      user.password,
    )

    if (!isMatchPassword) return { error: 'Senha incorreta, tente novamente.' }

    // TODO: Criar token que armazena a sessão do usuário

    return { success: 'Bem-vindo ao Aluno Connect.' }
  } catch (e) {
    return { error: 'Falha ao fazer login. Tente novamente.' }
  }
}
