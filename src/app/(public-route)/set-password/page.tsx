import SetPasswordForm from '@/components/auth/set-password-form'
import AuthService from '@/services/auth-service'
import { redirect } from 'next/navigation'

export default async function SetPassword() {
  const { id, email, profile } = await AuthService.getTemporaryUser()
  if (!id || !email || !profile) redirect('/primeiro-acesso')

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-10">
      <SetPasswordForm
        id={id as string}
        profile={profile as string}
        email={email as string}
      />
    </main>
  )
}
