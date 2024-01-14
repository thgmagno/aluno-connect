import * as jose from 'jose'
import { cookies } from 'next/headers'

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

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  createTemporarySession,
  getTemporaryUser,
  closeTemporarySession,
}

export default AuthService

// async function getUserProfileLogged() {
//   const session = cookies().get('session-aluno-connect')
//   if (!session) return {}
//   const { profile } = await openSessionToken(session.value)

//   return {
//     isAdmin: profile === 'administrator',
//     isStudent: profile === 'student',
//     isInstructor: profile === 'instructor',
//     isParent: profile === 'parent',
//   }
// }
