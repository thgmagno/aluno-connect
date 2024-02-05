'use server'

import { FrequencyFormState } from '@/lib/states'
import db from '@/db'

export async function newFrequency(
  formState: FrequencyFormState,
  formData: FormData,
): Promise<FrequencyFormState> {
  const length = parseInt(formData.get('length') as string)
  const classId = formData.get('classId') as string
  let studentId = ''
  let status = ''
  const promises = []

  const frequencyExists = await db.frequency.findFirst({
    where: { classId, date: new Date() },
  })

  if (frequencyExists) {
    return { errors: { _form: 'A frequência já foi registrada nessa data' } }
  }

  for (let i = 0; i < length; i++) {
    studentId = formData.get(`studentId${i}`) as string
    status = formData.get(`status${i}`) as string

    promises.push(
      db.frequency.create({
        data: {
          classId,
          studentId,
          status: status === 'on' ? 'PRESENT' : 'ABSENT',
        },
      }),
    )
  }

  try {
    if (promises.length) {
      await Promise.all(promises)
    } else {
      return { errors: { _form: 'Lista vazia' } }
    }
  } catch (e) {
    console.log(e)
    return { errors: { _form: 'Erro ao gravar frequência.' } }
  }

  return { success: true, errors: {} }
}
