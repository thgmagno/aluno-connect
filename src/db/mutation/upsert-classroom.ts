'use server'

import db from '@/db'
import { ClassFormState } from '@/lib/states'
import { classSchema } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertClassroom(
  formState: ClassFormState,
  formData: FormData,
): Promise<ClassFormState> {
  const parsed = classSchema.safeParse({
    id: formData.get('id'),
    course_name: formData.get('courseName'),
  })

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }

  try {
    await db.classroom.upsert({
      where: { id: parsed.data.id },
      update: {
        course_name: parsed.data.course_name,
      },
      create: {
        course_name: parsed.data.course_name,
      },
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return {
        errors: { course_name: ['Este curso já está cadastrado'] },
      }
    } else {
      return {
        errors: { _form: ['Erro desconhecido'] },
      }
    }
  }

  revalidatePath('/administrator/classrooms')
  redirect('/administrator/classrooms')
}
