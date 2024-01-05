import SetPasswordForm from '@/modules/auth/components/set-password-form'

export default async function SetPassword({
  params,
}: {
  params: { id: string }
}) {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-10">
      <SetPasswordForm id={params.id} />
    </main>
  )
}