import StudentFrequencyList from '@/components/frequency/student-frequency-list'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'

export default async function StudentFrequencyPage() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { sub } = await AuthService.openSessionToken(token.value)

  // TODO: Create variable to armazene student age.

  return (
    <>
      <h1 className="text-lg font-medium text-muted-foreground">
        Lista de frequência
      </h1>
      <StudentFrequencyList id={sub as string} />
    </>
  )
}
