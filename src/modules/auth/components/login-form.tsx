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
import BtnPromise from '@/modules/common/components/btn-promise'

export default function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>Faça login para continuar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="mb-6 flex justify-between">
            <div className="flex flex-col items-center space-y-1.5">
              <Label htmlFor="instructor" className="text-sm">
                Instrutor
              </Label>
              <Input
                type="radio"
                name="userType"
                id="instructor"
                className="h-5 w-5"
              />
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Label htmlFor="student" className="text-sm">
                Aluno
              </Label>
              <Input
                type="radio"
                name="userType"
                id="student"
                className="h-5 w-5"
              />
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Label htmlFor="parent" className="text-sm">
                Responsável
              </Label>
              <Input
                type="radio"
                name="userType"
                id="parent"
                className="h-5 w-5"
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" placeholder="Digite o seu e-mail" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" placeholder="Digite a sua senha" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="primeiro-acesso"
          className="text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
        >
          Primeiro acesso?
        </Link>
        <BtnPromise title="Entrar" />
      </CardFooter>
    </Card>
  )
}
