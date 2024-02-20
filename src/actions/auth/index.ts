'use server'

import { prisma } from '@/lib/prisma'
import {
  ActivateEmailSchema,
  LoginSchema,
  SetPasswordSchema,
} from '@/lib/schema'
import {
  ActivateEmailFormState,
  LoginFormState,
  SetPasswordFormState,
} from '@/lib/states'
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

    if (!response.password) {
      return {
        errors: {
          _form: 'Para ativar sua conta clique no botão Primeiro Acesso',
        },
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

export async function activateEmail(
  formState: ActivateEmailFormState,
  formData: FormData,
): Promise<ActivateEmailFormState> {
  const parsed = ActivateEmailSchema.safeParse({
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const response = await prisma.user.findFirst({
    where: { email: parsed.data.email, password: null },
  })

  if (!response) {
    return {
      errors: { _form: 'Endereço de e-mail não cadastrado ou já ativado' },
    }
  }

  redirect(`/definir-senha?email=${response.email}`)
}

export async function setPassword(
  formState: SetPasswordFormState,
  formData: FormData,
): Promise<SetPasswordFormState> {
  const parsed = SetPasswordSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirm: formData.get('confirm'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const findEmail = await prisma.user.findFirst({
      where: { email: parsed.data.email, password: null },
    })

    const passwordHash = await bcrypt.hash(parsed.data.password, 10)

    const updateUser = await prisma.user.update({
      where: { email: findEmail?.email },
      data: { password: passwordHash },
    })

    const payload = {
      sub: String(updateUser.id),
      name: updateUser.name,
      email: updateUser.email,
      profile: updateUser.profile,
      birthdate: String(updateUser.birthdate),
    }

    await createSessionToken({ payload })
  } catch (e) {
    return { errors: { _form: 'Não foi possível definir a senha' } }
  }

  return { errors: {} }
}
