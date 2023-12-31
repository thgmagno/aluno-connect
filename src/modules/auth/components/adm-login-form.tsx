'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { authenticateAdministrator } from '../actions/auth-actions'

export default function AdmLoginForm() {
  const formSubmit = async (formData: FormData) => {
    const res = await authenticateAdministrator(formData)
    if (res) {
      alert(res.success || res.error)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Área do administrador.</CardDescription>
      </CardHeader>
      <form action={formSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input name="email" placeholder="Digite o seu e-mail" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input name="password" placeholder="Digite a sua senha" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
