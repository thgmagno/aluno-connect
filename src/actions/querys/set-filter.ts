'use server'

import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function SetFilter(formData: FormData) {
  const profileSlug = await AuthService.getUserProfile()
  const search = formData.get('search') as string
  const path = formData.get('path') as string

  if (!search) return

  const params = new URLSearchParams()
  params.append('search', search)

  const url = new URL(`${process.env.BASE_URL}/${profileSlug}/${path}`)
  url.search = params.toString()

  redirect(url.toString())
}
