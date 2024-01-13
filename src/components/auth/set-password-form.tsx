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
import { EyeOff, Eye } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import * as actions from '@/actions/auth-actions'
import BtnFormSubmit from '../common/btn-form-submit'
import { useFormState } from 'react-dom'

export default function SetPasswordForm({
  id,
  profile,
  email,
}: {
  id: string
  profile: string
  email: string
}) {
  const [visible, setVisible] = useState(false)
  const [formState, action] = useFormState(actions.registerUserPassword, {
    errors: {},
  })

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>
          Vamos garantir que sua conta seja protegida.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="profile" value={profile} />
          <Input type="text" name="email" value={email} readOnly />
          <div
            className={`flex flex-col gap-2 ${
              formState.errors.password && 'text-red-600'
            }`}
          >
            <Label htmlFor="password">Senha</Label>
            <div className="relative flex flex-col">
              <Input
                type={visible ? 'text' : 'password'}
                name="password"
                placeholder="Informe uma senha segura"
                className={`${formState.errors.password && 'bg-red-200'}`}
              />
              <Button
                type="button"
                variant={'link'}
                className="absolute right-0 text-zinc-500"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            {formState.errors.password && (
              <p className="mb-2 text-sm">{formState.errors.password}</p>
            )}
          </div>
          <div
            className={`flex flex-col gap-2 ${
              formState.errors.confirm && 'text-red-600'
            }`}
          >
            <Label htmlFor="confirm">Confirme a senha</Label>
            <Input
              type={visible ? 'text' : 'password'}
              name="confirm"
              placeholder="Confirme a senha"
              className={`${formState.errors.confirm && 'bg-red-200'}`}
            />
            {formState.errors.confirm && (
              <p className="mb-2 text-sm">{formState.errors.confirm}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <BtnFormSubmit>Salvar</BtnFormSubmit>
          <Link
            href="/primeiro-acesso"
            className="w-full text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
          >
            <Button type="button" variant={'outline'} className="w-full">
              Voltar
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
