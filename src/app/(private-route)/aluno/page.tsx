import RenderStudentFrequency from '@/components/student/render-my-frequency'
import prisma from '@/lib/prisma'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function StudentHome() {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { sub } = await AuthService.openSessionToken(token.value)
  if (!sub) cookies().delete('session-aluno-connect')

  const frequency = await prisma.frequency.findMany({
    where: { studentId: sub },
  })

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg text-muted-foreground">Minha frequência:</h3>
      {frequency.length > 0 ? (
        RenderStudentFrequency({ frequency })
      ) : (
        <p>Nenhuma presença registrada para você neste momento.</p>
      )}
    </div>
  )
}
