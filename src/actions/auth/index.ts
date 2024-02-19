'use server'

import { prisma } from '@/lib/prisma'
import { LoginSchema } from '@/lib/schema'
import { LoginFormState } from '@/lib/states'
import * as bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { PayloadType } from '@/lib/types'
import { redirect } from 'next/navigation'

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const response = await prisma.user.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (!response) {
      return {
        errors: { email: ['E-mail inválido'] },
      }
    }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      response.password as string,
    )

    if (!passwordMatch) {
      return { errors: { password: ['Senha inválida'] } }
    }

    const payload = {
      sub: String(response.id),
      name: response.name,
      email: response.email,
      profile: response.profile,
      birthdate: String(response.birthdate),
    }

    await createSessionToken({ payload })
  } catch (e) {
    return {
      errors: {
        _form: 'Não foi possível estabelecer uma conexão segura com o servidor',
      },
    }
  }

  return redirect('/')
}

export async function logout() {
  return cookies().delete('session-aluno-connect')
}

async function createSessionToken({ payload }: PayloadType) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('7d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set('session-aluno-connect', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  })
}

export async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}
