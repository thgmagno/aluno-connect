'use server'

import prisma from '@/lib/prisma'
import { StudentFormState } from '@/lib/states'
import { studentSchema } from '@/lib/types'
import paths from '@/paths'
import { redirect } from 'next/navigation'

export async function UpsertStudent(
  formState: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> {
  const parsed = studentSchema.safeParse({
    id: formData.get('id'),
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
    await prisma.student.upsert({
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
      return { errors: { email: ['Ops! Esse e-mail já está registrado'] } }
    } else {
      return {
        errors: {
          _form: ['Não foi possível realizar o cadastro' + e],
        },
      }
    }
  }

  redirect(paths.getEntitiesPath('administrator', 'student'))
}
