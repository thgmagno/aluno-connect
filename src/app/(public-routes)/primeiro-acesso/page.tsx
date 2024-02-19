import {
  CardAuth,
  CardAuthRecognizeEmail,
} from '@/components/card-auth/card-auth'

export default async function FirstAccess() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-indigo-950 to-neutral-950">
      <CardAuth>
        <CardAuthRecognizeEmail />
      </CardAuth>
    </main>
  )
}
