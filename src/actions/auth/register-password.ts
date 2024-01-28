'use server'

import db from '@/db'
import { RegisterUserPassword } from '@/lib/states'
import { registerUserPasswordSchema } from '@/lib/types'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

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
      await db.instructor.update({
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
      await db.student.update({
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
      await db.parent.update({
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
  redirect(paths.signInPath())
}
