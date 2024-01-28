'use server'

import db from '@/db'
import { AuthenticateEmailFormState } from '@/lib/states'
import { validateEmailSchema } from '@/lib/types'
import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

interface AuthenticateEmailProps {
  id: string
  email: string
  usertype: string
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
    const user: AuthenticateEmailProps[] = await db.$queryRaw`
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
