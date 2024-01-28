'use server'

import { StudentFormState } from '@/lib/states'
import { studentSchema } from '@/lib/types'
import db from '@/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertStudent(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = studentSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('birthdate'),
  })

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }

  try {
    await db.student.upsert({
      where: { id: parsed.data.id },
      update: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: new Date(parsed.data.birthdate),
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
        birthdate: new Date(parsed.data.birthdate),
      },
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        errors: { email: ['Este e-mail já está cadastrado'] },
      }
    } else {
      return {
        errors: { _form: ['Erro desconhecido'] },
      }
    }
  }

  revalidatePath('/administrator/students')
  redirect('/administrator/students')
}
