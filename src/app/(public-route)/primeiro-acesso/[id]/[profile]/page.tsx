import SetPasswordForm from '@/components/auth/set-password-form'

export default async function SetPassword({
  params,
}: {
  params: { id: string; profile: string }
}) {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-10">
      <SetPasswordForm id={params.id} profile={params.profile} />
    </main>
  )
}
