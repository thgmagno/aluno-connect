'use server'

import prisma from '@/lib/prisma'
import { RequestFormState } from '@/lib/states'
import { requestSchema } from '@/lib/types'
import paths from '@/paths'
import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export async function request(
  formState: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> {
  const profile = await AuthService.getUserProfile()
  const parsed = requestSchema.safeParse({
    justification: formData.get('justification'),
    media: formData.get('media'),
  })

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  redirect(paths.getEntitiesPath(profile, 'frequency'))
}
