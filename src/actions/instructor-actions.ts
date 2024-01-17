'use server'

import prisma from '@/lib/prisma'
import { FrequencyFormState } from '@/lib/states'

export async function markFrequency(
  formState: FrequencyFormState,
  formData: FormData,
): Promise<FrequencyFormState> {
  const length = formData.get('length') as string
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const promises = []

  const existingFrequency = await prisma.frequency.findFirst({
    where: { date: { equals: currentDate } },
  })

  if (existingFrequency) {
    return {
      success: false,
      errors: {
        _form: 'Atenção: Frequência para o dia atual já está no sistema',
      },
    }
  }

  for (let i = 0; i < parseInt(length); i++) {
    const studentId = formData.get(`studentID${i}`) as string
    const status = formData.get(`status${i}`) as string

    if (!studentId || !status) {
      return {
        success: false,
        errors: { _form: `Dados insuficientes na linha ${i}` },
      }
    }

    promises.push(
      prisma.frequency.create({
        data: {
          studentId,
          status: status === 'present',
          date: currentDate,
        },
      }),
    )
  }

  try {
    await Promise.all(promises)
  } catch (e) {
    return {
      success: false,
      errors: { _form: 'Erro durante a criação das frequências' + e },
    }
  }

  return { success: true, errors: {} }
}
