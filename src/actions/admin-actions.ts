'use server'

import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function createStudent(
  formState: { message: string },
  formData: FormData,
) {
  // verificar se o usuário tem perfil de ADM
  const session = cookies().get('session-aluno-connect')
  if (!session) redirect('/entrar')
  const { profile } = await AuthService.openSessionToken(session.value)
  const isAdm = profile === 'administrator'
  if (!isAdm) return { message: 'Não autorizado' }

  const name = formData.get('name')
  const email = formData.get('email')
  const birthdate = formData.get('birthdate')

  if (typeof name !== 'string' || name.length < 1) {
    return { message: 'O nome é obrigatório' }
  }

  if (typeof email !== 'string' || email.length < 1) {
    return { message: 'O email é obrigatório' }
  }

  if (typeof birthdate !== 'string' || !birthdate) {
    return { message: 'A data de nascimento é obrigatória' }
  }

  try {
    await prisma.student.create({
      data: {
        name,
        email,
        birthdate: new Date(birthdate).toISOString(),
      },
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        message:
          'Ops, esse e-mail já consta em nossa base de dados. Tente novamente',
      }
    } else {
      return { message: 'Erro ao realizar cadastro' }
    }
  }

  redirect('/administrador/alunos')
}
