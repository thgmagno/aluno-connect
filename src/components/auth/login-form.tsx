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
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import BtnFormSubmit from '../common/btn-form-submit'
import { useFormState } from 'react-dom'
import { authenticateUser } from '@/actions/auth'

export default function LoginForm() {
  const [visible, setVisible] = useState(false)
  const [formState, action] = useFormState(authenticateUser, {
    errors: {},
  })

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Faça login para continuar.</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="flex flex-col gap-4">
          <div
            className={`flex flex-col gap-2 ${
              formState.errors.email && 'text-red-600'
            }`}
          >
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
              className={`${formState.errors.email && 'border border-red-600'}`}
            />
            {formState.errors.email && (
              <p className="text-sm">{formState.errors.email.join(', ')}</p>
            )}
          </div>
          <div
            className={`relative flex flex-col gap-2 ${
              formState.errors.password && 'text-red-600'
            }`}
          >
            <Label htmlFor="password">Senha</Label>
            <Input
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder="Digite a sua senha"
              className={`${
                formState.errors.password && 'border border-red-600'
              }`}
            />
            {formState.errors.password && (
              <p className="text-sm">{formState.errors.password.join(', ')}</p>
            )}
            <Button
              type="button"
              variant={'link'}
              className="absolute right-2 top-3.5 mt-2 p-2 text-zinc-500"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          {formState.errors._form && (
            <p className="rounded border-2 border-red-400 bg-red-200 p-2 text-sm text-red-700">
              {formState.errors._form.join(', ')}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <BtnFormSubmit>Entrar</BtnFormSubmit>
          <Link href="first-access" className="w-full">
            <Button type="button" variant={'outline'} className="w-full">
              Primeiro acesso?
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
