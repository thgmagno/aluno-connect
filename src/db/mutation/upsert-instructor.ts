'use server'

import db from '@/db'
import { InstructorFormState } from '@/lib/states'
import { instructorSchema } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertInstructor(
  formState: InstructorFormState,
  formData: FormData,
): Promise<InstructorFormState> {
  const parsed = instructorSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }

  try {
    await db.instructor.upsert({
      where: { id: parsed.data.id },
      update: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
      create: {
        name: parsed.data.name,
        email: parsed.data.email,
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

  revalidatePath('/administrator/instructors')
  redirect('/administrator/instructors')
}
