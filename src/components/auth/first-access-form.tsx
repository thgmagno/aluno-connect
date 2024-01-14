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
import Link from 'next/link'
import * as actions from '@/actions/auth-actions'
import BtnFormSubmit from '../common/btn-form-submit'
import { useFormState } from 'react-dom'

export default function FirstAccessForm() {
  const [formState, action] = useFormState(actions.authenticateEmail, {
    errors: {},
  })

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Informe o seu email para continuar.</CardDescription>
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
              name="email"
              type="email"
              placeholder="Digite o seu e-mail"
              className={`${formState.errors.email && 'bg-red-200'}`}
            />
            {formState.errors.email && (
              <p className="text-sm">{formState.errors.email}</p>
            )}
          </div>
          {formState.errors._form && (
            <p className="rounded border-2 border-red-400 bg-red-200 p-2 text-sm text-red-700">
              {formState.errors._form}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <BtnFormSubmit>Avançar</BtnFormSubmit>
          <Link
            href="entrar"
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
