'use server'

import prisma from '@/lib/prisma'
import { StudentFormState } from '@/lib/states'
import { instructorSchema } from '@/lib/types'
import paths from '@/paths'
import { redirect } from 'next/navigation'

export async function UpsertInstructor(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = instructorSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.instructor.upsert({
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
      return { errors: { email: ['Ops! Esse e-mail já está registrado'] } }
    } else {
      return {
        errors: {
          _form: ['Não foi possível realizar o cadastro' + e],
        },
      }
    }
  }

  redirect(paths.getEntitiesPath('administrator', 'instructor'))
}
