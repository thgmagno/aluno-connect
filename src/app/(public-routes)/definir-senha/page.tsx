import { CardAuth, CardAuthSetPassword } from '@/components/card-auth/card-auth'

export default async function SetPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-indigo-950 to-neutral-950">
      <CardAuth>
        <CardAuthSetPassword />
      </CardAuth>
    </main>
  )
}
