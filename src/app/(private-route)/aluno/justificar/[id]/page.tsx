import JustifyForm from '@/components/student/justify-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function Justify({ params }: { params: { id: string } }) {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { sub, name } = await AuthService.openSessionToken(token.value)
  const frequency = await prisma.frequency.findUniqueOrThrow({
    where: { id: params.id },
  })

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex justify-between text-muted-foreground">
          <Link href="/aluno">
            <ArrowLeft />
          </Link>
          {frequency.date.toLocaleDateString('pt-br')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <JustifyForm
          frequencyId={frequency.id}
          studentId={sub as string}
          studentName={name as string}
        />
      </CardContent>
    </Card>
  )
}
