'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateStudentAccount(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  try {
    await prisma.student.update({
      data: {
        name,
        email,
      },
      where: {
        id,
      },
    })
    revalidatePath('/alunos')
    return { success: 'Cadastro alterado' }
  } catch (e) {
    return { error: 'Não foi possível alterar o cadastro' }
  }
}

export async function updateInstructorAccount(formData: FormData) {
  if (formData) console.log('implementar')
}
export async function updateParentAccount(formData: FormData) {
  if (formData) console.log('implementar')
}
