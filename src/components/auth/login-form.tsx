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
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import * as actions from '@/actions/auth-actions'
import BtnFormSubmit from '../common/btn-form-submit'

export default function LoginForm() {
  const [visible, setVisible] = useState(false)
  const formSubmit = async (formData: FormData) => {
    const res = await actions.authenticateUser(formData)

    if (res) {
      const { success, error } = res
      success && toast.success(success)
      error && toast.error(error)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Faça login para continuar.</CardDescription>
      </CardHeader>
      <form action={formSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
            />
          </div>
          <div className="relative flex flex-col space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder="Digite a sua senha"
            />
            <Button
              type="button"
              variant={'link'}
              className="absolute right-2 top-3.5 mt-2 p-2 text-zinc-500"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeOff />}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <BtnFormSubmit>Entrar</BtnFormSubmit>
          <Link href="primeiro-acesso" className="w-full">
            <Button type="button" variant={'outline'} className="w-full">
              Primeiro acesso?
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
