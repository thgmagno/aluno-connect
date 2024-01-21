import { redirect } from 'next/navigation'
import paths from '@/paths'
import AuthService from '@/services/auth-service'

export default async function Home() {
  const profile = await AuthService.getUserProfile()
  redirect(paths.homePath(profile))
}
