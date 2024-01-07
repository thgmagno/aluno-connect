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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import BtnPromise from '@/modules/common/components/btn-promise'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { authenticateEmail } from '../actions/auth-actions'

export default function FirstAccessForm() {
  const router = useRouter()
  const formSubmit = async (formData: FormData) => {
    const res = await authenticateEmail(formData)

    const { user, error } = res

    if (Array.isArray(user) && user.length > 0 && 'id' in user[0]) {
      router.replace(`/primeiro-acesso/${user[0].id}/${user[0].usertype}`)
    }

    error && toast.error(error)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Informe o seu email para continuar.</CardDescription>
      </CardHeader>
      <form action={formSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                type="email"
                placeholder="Digite o seu e-mail"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            href="entrar"
            className="text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
          >
            <Button type="button" variant={'outline'}>
              Voltar
            </Button>
          </Link>
          <BtnPromise title="Avançar" color="teal" />
        </CardFooter>
      </form>
    </Card>
  )
}
