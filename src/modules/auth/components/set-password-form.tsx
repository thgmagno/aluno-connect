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

export default function SetPasswordForm() {
  const [visible, setVisible] = useState(false)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>
          Vamos garantir que sua conta seja protegida.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="">E-mail</Label>
              <Input type="text" value={'[e-mail do usuário]'} disabled />
            </div>
            <div className="relative flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                type={visible ? 'text' : 'password'}
                id="password"
                placeholder="Informe uma senha segura"
              />
              <Input
                type={visible ? 'text' : 'password'}
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="primeiro-acesso"
          className="text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
        >
          <Button type="button" variant={'outline'}>
            Voltar
          </Button>
        </Link>
        <BtnPromise title="Salvar" color="teal" />
      </CardFooter>
    </Card>
  )
}
