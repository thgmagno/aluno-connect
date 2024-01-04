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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'
import { UserType } from '@/lib/types'
import {
  authenticateEmailAdministrator,
  authenticateEmailInstructor,
  authenticateEmailParent,
  authenticateEmailStudent,
} from '../actions/auth-actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function FirstAccessForm() {
  const router = useRouter()
  const formSubmit = async (formData: FormData) => {
    const userType: UserType = formData.get('userType') as UserType
    if (!userType) return toast.error('Preencha todos os campos.')

    const authenticateEmailFunctions = {
      instructor: authenticateEmailInstructor,
      student: authenticateEmailStudent,
      parent: authenticateEmailParent,
      administrator: authenticateEmailAdministrator,
    }

    const { user, error } = await authenticateEmailFunctions[userType](formData)

    user?.email && router.replace(`/primeiro-acesso/${user.id}`)

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
              <Input name="email" placeholder="Digite o seu e-mail" />
            </div>
          </div>
          <Select name="userType">
            <SelectTrigger>
              <SelectValue placeholder="Selecione um perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Perfis</SelectLabel>
                <SelectItem value="instructor">Instrutor</SelectItem>
                <SelectItem value="student">Estudante</SelectItem>
                <SelectItem value="parent">Responsável</SelectItem>
                <SelectItem value="administrator">Administrador</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
