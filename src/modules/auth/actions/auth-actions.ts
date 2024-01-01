'use server'

import prisma from '@/lib/prisma'
import {
  administratorLoginSchema,
  instructorLoginSchema,
  parentLoginSchema,
  studentLoginSchema,
} from '@/lib/types'
import * as bcrypt from 'bcrypt'

export async function authenticateInstructor(formData: FormData) {
  const parsed = instructorLoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + '. '
    })

    return { error: errorMessage }
  }

  try {
    const user = await prisma.instructor.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (!user) {
      return {
        error: 'Cadastro de Instrutor não encontrado. Tente novamente.',
      }
    }

    if (!user.password) {
      return {
        error:
          'Para continuar defina uma senha clicando no botão "Primeiro Acesso".',
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

export async function authenticateStudent(formData: FormData) {
  const parsed = studentLoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issues) => {
      errorMessage = errorMessage + issues.message + '. '
    })

    return { error: errorMessage }
  }

  try {
    const user = await prisma.student.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (!user)
      return { error: 'Cadastro de Estudante não encontrado. Tente novamente.' }

    if (!user.password)
      return {
        error:
          'Para continuar defina uma senha clicando no botão "Primeiro Acesso".',
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

export async function authenticateParent(formData: FormData) {
  const parsed = parentLoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issues) => {
      errorMessage = errorMessage + issues.message + '. '
    })

    return { error: errorMessage }
  }

  try {
    const user = await prisma.parent.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (!user)
      return {
        error: 'Cadastro de Responsável não encontrado. Tente novamente.',
      }

    if (!user.password)
      return {
        error:
          'Para continuar defina uma senha clicando no botão "Primeiro Acesso".',
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

    return { error: errorMessage }
  }

  try {
    const user = await prisma.administrator.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (!user) {
      return {
        error: 'Cadastro de Administrador não encontrado. Tente novamente.',
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
