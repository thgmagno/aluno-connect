'use server'

import prisma from '@/lib/prisma'
import {
  AuthenticateEmailFormState,
  AuthenticateUserFormState,
  RegisterUserPassword,
} from '@/lib/states'
import {
  loginUserSchema,
  registerUserPasswordSchema,
  validateEmailSchema,
} from '@/lib/types'
import AuthService from '@/services/auth-service'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  password?: string
  profile: string
  usertype: 'student' | 'administrator' | 'parent' | 'instructor'
}

interface AuthenticateEmailProps {
  id: string
  email: string
  usertype: string
}

export async function authenticateUser(
  formState: AuthenticateUserFormState,
  formData: FormData,
): Promise<AuthenticateUserFormState> {
  const parsed = loginUserSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
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

    if (!user || !user.length) {
      return {
        errors: {
          _form: [
            'Parece que você ainda não efetuou o seu registro. Entre em contato com um coordenador para realizar o cadastro.',
          ],
        },
      }
    }

    if (!user[0].password) {
      return {
        errors: {
          _form: [
            'Para continuar, defina uma senha clicando no botão "Primeiro Acesso"',
          ],
        },
      }
    }

    const isMatchPassword = await bcrypt.compare(
      parsed.data.password,
      user[0].password,
    )

    if (!isMatchPassword) {
      return { errors: { password: ['Senha incorreta, tente novamente.'] } }
    }

    const payload = {
      sub: user[0].id,
      name: user[0].name,
      profile: user[0].usertype,
    }

    await AuthService.createSessionToken({ payload })
  } catch (e) {
    return {
      errors: {
        _form: [
          'Não foi possível estabelecer uma conexão segura com este site',
        ],
      },
    }
  }
  redirect('/')
}

export async function authenticateEmail(
  formState: AuthenticateEmailFormState,
  formData: FormData,
): Promise<AuthenticateEmailFormState> {
  const parsed = validateEmailSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const user: AuthenticateEmailProps[] = await prisma.$queryRaw`
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
      return {
        errors: {
          email: ['E-mail inexistente ou já ativado.'],
        },
      }
    }

    const payload = {
      sub: user[0].id,
      email: user[0].email,
      profile: user[0].usertype,
    }

    await AuthService.createTemporarySession({ payload })
  } catch (e) {
    if (e instanceof Error && e.message.includes(`Can't reach database`)) {
      return {
        errors: {
          _form: ['Não foi possível conectar ao servidor'],
        },
      }
    }
    return {
      errors: {
        email: ['Erro na autenticação'],
      },
    }
  }

  redirect('/definir-senha')
}

export async function registerUserPassword(
  formState: RegisterUserPassword,
  formData: FormData,
): Promise<RegisterUserPassword> {
  const parsed = registerUserPasswordSchema.safeParse({
    id: formData.get('id'),
    email: formData.get('email'),
    profile: formData.get('profile'),
    password: formData.get('password'),
    confirm: formData.get('confirm'),
  })

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }

  const hashPassword = await bcrypt.hash(parsed.data.password, 10)

  try {
    if (parsed.data.profile === 'instructor') {
      await prisma.instructor.update({
        where: {
          id: parsed.data.id,
        },
        data: {
          password: hashPassword,
          firstAccess: false,
        },
      })
    }
    if (parsed.data.profile === 'student') {
      await prisma.student.update({
        where: {
          id: parsed.data.id,
        },
        data: {
          password: hashPassword,
          firstAccess: false,
        },
      })
    }
    if (parsed.data.profile === 'parent') {
      await prisma.parent.update({
        where: {
          id: parsed.data.id,
        },
        data: {
          password: hashPassword,
          firstAccess: false,
        },
      })
    }
  } catch (e) {
    return {
      errors: {
        _form: ['Falha ao cadastrar senha.'],
      },
    }
  }

  AuthService.closeTemporarySession()
  redirect('/entrar')
}
