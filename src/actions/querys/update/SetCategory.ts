'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function SetCategoryToRequest(formData: FormData) {
  const category = formData.get('category') as string
  const requestId = formData.get('requestId') as string

  try {
    await prisma.request.update({
      where: { id: requestId },
      data: { category },
    })
  } catch (e) {
    console.log('Erro ao atualizar status', e)
  }

  revalidatePath('/administrator/request')
}
