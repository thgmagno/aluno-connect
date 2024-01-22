'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function ApproveRequest(formData: FormData) {
  const frequencyId = formData.get('frequencyId') as string

  try {
    await prisma.frequency.update({
      where: { id: frequencyId },
      data: { status: 'APPROVED' },
    })
  } catch (e) {
    console.log('Erro ao atualizar status', e)
  }

  revalidatePath('/administrator/request')
}
