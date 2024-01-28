'use server'

import { ParentFormState } from '@/lib/states'
import { parentSchema } from '@/lib/types'
import db from '@/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertParent(
  formState: ParentFormState,
  formData: FormData,
): Promise<ParentFormState> {
  const parsed = parentSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    birthdate: formData.get('bithdate'),
  })

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }

  try {
    await db.parent.upsert({
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

  revalidatePath('/administrator/parents')
  redirect('/administrator/parents')
}
