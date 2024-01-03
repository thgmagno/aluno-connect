'use client'

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
import toast from 'react-hot-toast'
import { authenticateAdministrator } from '@/modules/auth/actions/auth-actions'
import BtnPromise from '@/modules/common/components/btn-promise'

export default function AdmLoginForm() {
  const formSubmit = async (formData: FormData) => {
    const res = await authenticateAdministrator(formData)

    res.success && toast.success(res.success)
    res.error && toast.error(res.error)
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
          <BtnPromise title="Entrar" color="teal" />
        </CardFooter>
      </form>
    </Card>
  )
}
