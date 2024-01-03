'use server'

import { revalidatePath } from 'next/cache'
import postgres from 'postgres'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: 'allow',
})

export async function DeleteStudent(formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    name: z.string(),
  })
  const data = schema.parse({
    id: formData.get('id'),
    name: formData.get('name'),
  })

  try {
    await sql`
      DELETE FROM "Student"
      WHERE id = ${data.id}::text;
    `

    revalidatePath('/')
    return { success: `Estudante: ${data.name} deletado` }
  } catch (e) {
    return { error: 'Falha ao deletar estudante' }
  }
}
