'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BtnFormSubmit from '@/components/common/btn-form-submit'
import Querys from '@/actions/querys'
import { useFormState } from 'react-dom'
import type { Student } from '@prisma/client'
import { ReactNode } from 'react'

interface Props {
  data?: Student
  children: ReactNode
}

export function Student({ data, children }: Props) {
  const [formState, action] = useFormState(Querys.Create.Student, {
    errors: {},
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="primary">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Cadastrar Aluno</DialogTitle>
            <DialogDescription>
              Complete o formulário abaixo para cadastrar um novo aluno.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <input type="hidden" name="id" value={data?.id} />
            <div
              className={`flex flex-col gap-2 ${
                formState?.errors.name && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Nome:</Label>
              <Input
                name="name"
                defaultValue={data?.name}
                className={`${formState?.errors.name && 'border-red-600'}`}
              />
              {formState?.errors.name && (
                <p className="text-sm">{formState?.errors.name}</p>
              )}
            </div>
            <div
              className={`flex flex-col gap-3 ${
                formState?.errors.email && 'text-red-600'
              }`}
            >
              <Label htmlFor="email">E-mail:</Label>
              <Input
                type="text"
                name="email"
                defaultValue={data?.email}
                className={`col-span-3 ${
                  formState?.errors.email && 'border border-red-600'
                }`}
              />
              {formState?.errors.email && (
                <p className="text-sm">{formState?.errors.email}</p>
              )}
            </div>
            <div
              className={`flex flex-col gap-3 ${
                formState?.errors.birthdate && 'text-red-600'
              }`}
            >
              <Label htmlFor="birthdate">Data do aniversário:</Label>
              <Input
                type="date"
                name="birthdate"
                defaultValue={data?.birthdate.toISOString().slice(0, 10)}
                className={`col-span-3 ${
                  formState?.errors.birthdate && 'border border-red-600'
                }`}
              />
              {formState?.errors.birthdate && (
                <p className="text-sm">{formState?.errors.birthdate}</p>
              )}
            </div>
            {formState?.errors._form && (
              <p className="rounded-md border-2 border-red-600 bg-red-200 p-2 text-red-600">
                {formState?.errors._form}
              </p>
            )}
          </div>
          <DialogFooter>
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
