'use server'

import prisma from '@/lib/prisma'
import { UserType, loginUserSchema, validateEmailSchema } from '@/lib/types'
import AuthService from '@/services/auth-service'
import * as bcrypt from 'bcrypt'

interface User {
  id: string
  name: string
  email: string
  password?: string
  profile: string
  usertype: 'student' | 'administrator' | 'parent' | 'instructor'
}

export async function authenticateUser(formData: FormData) {
  const parsed = loginUserSchema.safeParse({
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
    const user: User[] | null = await prisma.$queryRaw`
      SELECT * FROM (
        SELECT 'instructor' as userType, id, name, email, password FROM instructor WHERE email = ${parsed.data.email}
        UNION
        SELECT 'student' as userType, id, name, email, password FROM student WHERE email = ${parsed.data.email}
        UNION
        SELECT 'parent' as userType, id, name, email, password FROM parent WHERE email = ${parsed.data.email}
        UNION
        SELECT 'administrator' as userType, id, name, email, password FROM administrator WHERE email = ${parsed.data.email}
      ) AS allUsers
      LIMIT 1
    `

    if (!user) {
      return {
        error: `Cadastro não encontrado. Tente novamente.`,
      }
    }

    if (!user[0].password) {
      return {
        error: `Para continuar, defina uma senha clicando no botão "Primeiro Acesso".`,
      }
    }

    const isMatchPassword = await bcrypt.compare(
      parsed.data.password,
      user[0].password,
    )

    if (!isMatchPassword) {
      return { error: 'Senha incorreta, tente novamente.' }
    }

    const payload = {
      sub: user[0].id,
      name: user[0].name,
      profile: user[0].usertype,
    }

    await AuthService.createSessionToken({ payload })

    return { success: 'Bem-vindo ao Aluno Connect.' }
  } catch (e) {
    return { error: 'Falha ao fazer login. Tente novamente.' }
  }
}

export async function authenticateEmail(formData: FormData) {
  const parsed = validateEmailSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    let errorMessage = ''

    parsed.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message + '. '
    })

    return { error: errorMessage }
  }

  try {
    const user = await prisma.$queryRaw`
      SELECT * FROM (
        SELECT 'student' as userType, id, email FROM student WHERE email = ${parsed.data.email}::text AND "firstAccess" = true AND password is null
        UNION
        SELECT 'instructor' as userType, id, email FROM instructor WHERE email = ${parsed.data.email}::text AND "firstAccess" = true AND password is null
        UNION
        SELECT 'parent' as userType, id, email FROM parent WHERE email = ${parsed.data.email}::text AND "firstAccess" = true AND password is null
      ) AS allUsers
      LIMIT 1
    `

    if (Array.isArray(user) && user.length < 1) {
      return { error: 'E-mail inexistente ou já ativado.' }
    }

    return { user }
  } catch (e) {
    return { error: 'Erro na autenticação. Tente novamente.' }
  }
}

export async function registerUserPassword(formData: FormData) {
  const id = formData.get('id') as string
  const profile = formData.get('profile') as UserType
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword')

  const isInstructor = profile === 'instructor'
  const isStudent = profile === 'student'
  const isParent = profile === 'parent'

  if (!password || !confirmPassword)
    return { error: 'Preencha todos os campos' }

  if (password !== confirmPassword)
    return { error: 'As senhas precisam ser iguais' }

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    if (isInstructor) {
      await prisma.instructor.update({
        where: {
          id,
        },
        data: {
          password: hashPassword,
          firstAccess: false,
        },
      })
    }
    if (isStudent) {
      await prisma.student.update({
        where: {
          id,
        },
        data: {
          password: hashPassword,
          firstAccess: false,
        },
      })
    }
    if (isParent) {
      await prisma.parent.update({
        where: {
          id,
        },
        data: {
          password: hashPassword,
          firstAccess: false,
        },
      })
    }
    return { success: 'Cadastro finalizado. Faça login para continuar.' }
  } catch (e) {
    return { error: 'Falha ao cadastrar senha. Tente novamente' }
  }
}
