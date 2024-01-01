import * as jose from 'jose'
import { cookies } from 'next/headers'

type PayloadType = {
  payload: {
    sub: string
    name: string
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

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
}

export default AuthService
