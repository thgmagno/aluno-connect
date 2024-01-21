import { UserType } from '@/lib/types'
import paths from '@/paths'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type PayloadType = {
  payload: {
    sub: string
    name: string
    profile: string
  }
}

type CreateTemporarySessionType = {
  payload: {
    sub: string
    email: string
    profile: string
  }
}

async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

async function createSessionToken({ payload }: PayloadType) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('1d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set('session-aluno-connect', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  })
}

async function createTemporarySession({ payload }: CreateTemporarySessionType) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('5m')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set('activating-account-aluno-connect', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  })
}

async function isSessionValid() {
  const sessionCookie = cookies().get('session-aluno-connect')

  if (sessionCookie?.value) {
    const { value } = sessionCookie
    const { exp } = await openSessionToken(value)
    const currentDate = new Date().getTime()

    return (exp as number) * 1000 >= currentDate
  }

  return false
}

async function getTemporaryUser() {
  const session = cookies().get('activating-account-aluno-connect')
  if (!session) return {}
  const { sub, profile, email } = await openSessionToken(session.value)

  return {
    id: sub,
    profile,
    email,
  }
}

async function closeTemporarySession() {
  return cookies().delete('activating-account-aluno-connect')
}

async function getUserProfile() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return redirect(paths.signInPath())
  const { profile } = (await openSessionToken(token.value)) as {
    profile: UserType
  }

  if (!profile) {
    cookies().delete('session-aluno-connect')
  }

  return profile
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  createTemporarySession,
  getTemporaryUser,
  closeTemporarySession,
  getUserProfile,
}

export default AuthService
