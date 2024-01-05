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
import { EyeOff, Eye } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function SetPasswordForm({
  id,
  profile,
}: {
  id: string
  profile: string
}) {
  const [visible, setVisible] = useState(false)
  const handleSubmit = async (formData: FormData) => {
    // TODO: setar a senha (com hash) na conta com respectivo id
    // TODO: setar a coluna firstAccess para o valor 'false'
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>
          Vamos garantir que sua conta seja protegida.
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent>
          <div className="relative flex flex-col space-y-1.5">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="profile" value={profile} />
            <Label htmlFor="password">Senha</Label>
            <Input
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder="Informe uma senha segura"
            />
            <Input
              type={visible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirme a senha"
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
        <CardFooter className="flex justify-between">
          <Link
            href="/primeiro-acesso"
            className="text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
          >
            <Button type="button" variant={'outline'}>
              Voltar
            </Button>
          </Link>
          <BtnPromise title="Salvar" color="teal" />
        </CardFooter>
      </form>
    </Card>
  )
}
