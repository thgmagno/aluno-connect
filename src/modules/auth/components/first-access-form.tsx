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

export default function FirstAccessForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Informe o seu email para continuar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" placeholder="Digite o seu e-mail" />
            </div>
          </div>
        </form>
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
        <BtnPromise title="Avançar" />
      </CardFooter>
    </Card>
  )
}
