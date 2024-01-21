'use server'

import prisma from '@/lib/prisma'
import { AuthenticateUserFormState } from '@/lib/states'
import { loginUserSchema } from '@/lib/types'
import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'
import * as bcrypt from 'bcrypt'

interface User {
  id: string
  name: string
  email: string
  password?: string
  profile: string
  usertype: 'student' | 'administrator' | 'parent' | 'instructor'
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
