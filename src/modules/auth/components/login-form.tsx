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
import { Button } from '@/components/ui/button'
import {
  authenticateAdministrator,
  authenticateInstructor,
  authenticateParent,
  authenticateStudent,
} from '../actions/auth-actions'
import toast from 'react-hot-toast'

type UserType = 'instructor' | 'student' | 'parent' | 'administrator'

export default function LoginForm() {
  const formSubmit = async (formData: FormData) => {
    const userType: UserType = formData.get('userType') as UserType
    if (!userType) return toast.error('Preencha todos os campos.')

    const authenticationFunctions = {
      instructor: authenticateInstructor,
      student: authenticateStudent,
      parent: authenticateParent,
      administrator: authenticateAdministrator,
    }

    const res = await authenticationFunctions[userType](formData)

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
        <CardContent>
          <div className="mb-6 grid grid-cols-2">
            <div className="flex flex-col items-center space-y-1.5">
              <Label htmlFor="instructor" className="text-sm">
                Instrutor
              </Label>
              <Input
                type="radio"
                id="instructor"
                name="userType"
                value="instructor"
                className="h-5 w-5"
              />
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Label htmlFor="student" className="text-sm">
                Aluno
              </Label>
              <Input
                type="radio"
                id="student"
                name="userType"
                value="student"
                className="h-5 w-5"
              />
            </div>
            <div className="mt-2 flex flex-col items-center space-y-1.5">
              <Label htmlFor="parent" className="text-sm">
                Responsável
              </Label>
              <Input
                type="radio"
                id="parent"
                name="userType"
                value="parent"
                className="h-5 w-5"
              />
            </div>
            <div className="mt-2 flex flex-col items-center space-y-1.5">
              <Label htmlFor="administrator" className="text-sm">
                Administrador
              </Label>
              <Input
                type="radio"
                id="administrator"
                name="userType"
                value="administrator"
                className="h-5 w-5"
              />
            </div>
          </div>

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
        <CardFooter className="flex justify-between">
          <Link href="primeiro-acesso">
            <Button type="button" variant={'outline'}>
              Primeiro acesso?
            </Button>
          </Link>
          <BtnPromise title="Entrar" />
        </CardFooter>
      </form>
    </Card>
  )
}
