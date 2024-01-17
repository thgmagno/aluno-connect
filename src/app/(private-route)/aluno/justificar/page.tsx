import JustifyForm from '@/components/student/justify-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Justify() {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { name } = await AuthService.openSessionToken(token.value)

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex justify-between text-muted-foreground">
          <Link href="/aluno">
            <ArrowLeft />
          </Link>
          10/10/2022
        </CardTitle>
      </CardHeader>
      <CardContent>
        <JustifyForm name={name as string} />
      </CardContent>
    </Card>
  )
}
