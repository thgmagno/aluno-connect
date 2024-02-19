'use server'

import { cookies } from 'next/headers'
import { EnumProfile } from '@/lib/types'
import { actions } from '@/actions'
import { redirect } from 'next/navigation'

export async function useSession() {
  const token = cookies().get('session-aluno-connect')

  if (!token || !token.value) redirect('/entrar')

  const response = await actions.auth.openSessionToken(token.value)

  const user = {
    id: Number(response.sub),
    name: response.name as string,
    email: response.email as string,
    profile: response.profile as EnumProfile,
    birthdate: new Date(response.birthdate as string) || null,
  }

  return user
}
