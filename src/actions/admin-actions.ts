'use server'

import prisma from '@/lib/prisma'
import { createStudentSchema } from '@/lib/schemas'
import { CreateStudentFormState } from '@/lib/states'
import AuthService from '@/services/auth-service'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const getProfile = async () => {
  const session = cookies().get('session-aluno-connect')
  if (!session) redirect('/entrar')
  const { profile } = await AuthService.openSessionToken(session.value)
  const isAdm = profile === 'administrator'
  return { isAdm }
}

export async function createStudent(
  formState: CreateStudentFormState,
  formData: FormData,
): Promise<CreateStudentFormState> {
  const { isAdmin } = await AuthService.getUserProfileLogged()
  if (!isAdmin)
    return {
      errors: {
        _form: ['O usuário atual não pode efetuar cadastros de alunos'],
      },
    }

  const parsed = createStudentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('birthdate'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.student.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: new Date(parsed.data.birthdate).toISOString(),
      },
    })
  } catch (e) {
    return {
      errors: {
        _form: ['Não foi possível realizar o cadastro'],
      },
    }
  }

  redirect('/administrador/alunos')
}

export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: { id },
    })
  } catch (e) {
    return { error: 'Não foi possível fazer a exclusão do aluno' }
  }

  revalidatePath('/administrador/alunos')

  return { message: 'Registro excluído com sucesso!' }
}

export async function updateStudent(
  formState: { message: string },
  formData: FormData,
) {
  const { isAdm } = await getProfile()
  if (!isAdm) return { message: 'Não autorizado' }

  const id = formData.get('id') as string
  const name = formData.get('name')?.toString().trim() || ''
  const email = formData.get('email')?.toString().trim() || ''
  const birthdate = formData.get('birthdate')?.toString().trim() || ''

  if (!id) redirect('/administrador/alunos')
  if (name.length < 1) return { message: 'O nome é obrigatório' }
  if (name.length < 1) return { message: 'O nome é obrigatório' }
  if (email.length < 1) return { message: 'O email é obrigatório' }
  if (!birthdate) return { message: 'A data de nascimento é obrigatória' }

  try {
    await prisma.student.update({
      where: { id },
      data: {
        name,
        email,
        birthdate: new Date(birthdate).toISOString(),
      },
    })
  } catch (e) {
    return { message: 'Não foi possível atualizar os dados' }
  }

  redirect('/administrador/alunos')
}

export async function resetStudentPassword(id: string) {
  try {
    await prisma.student.update({
      where: { id },
      data: {
        password: null,
        firstAccess: true,
      },
    })
  } catch (e) {
    return { error: 'Não foi possível resetar a senha' }
  }

  return { message: 'Senha resetada com sucesso' }
}

// TODO: Essa função tambem será usada por Instrutores
export async function getStudentByID(id: string) {
  const student = await prisma.student.findUnique({
    where: { id },
  })

  return { student }
}
