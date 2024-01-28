'use client'

import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useFormState } from 'react-dom'
import { mutation } from '@/db/mutation'
import BtnFormSubmit from '@/components/common/btn-form-submit'

export function DialogCreateStudent() {
  const [formState, action] = useFormState(mutation.createStudent, {
    errors: {},
  })

  return (
    <div className="mb-5 flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="emerald" size="sm">
            <PlusCircle className="mr-2 h-5 w-5" />
            Cadastrar
          </Button>
        </DialogTrigger>
        <DialogContent>
          {/* // TODO: Criar a action */}
          <form action={action} className="space-y-5">
            <div
              className={`space-y-2 ${
                formState?.errors.name && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                type="text"
                className={`${
                  formState?.errors.name && 'border border-red-600'
                }`}
              />
              {formState?.errors.name && (
                <p className="text-sm">{formState?.errors.name}</p>
              )}
            </div>
            <div
              className={`space-y-2 ${
                formState?.errors.email && 'text-red-600'
              }`}
            >
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                type="email"
                className={`${
                  formState?.errors.email && 'border border-red-600'
                }`}
              />
              {formState?.errors.email && (
                <p className="text-sm">{formState?.errors.email}</p>
              )}
            </div>
            <div
              className={`space-y-2 ${
                formState?.errors.birthdate && 'text-red-600'
              }`}
            >
              <Label htmlFor="birthdate">Data de aniversário</Label>
              <Input
                name="birthdate"
                type="date"
                className={`${
                  formState?.errors.birthdate && 'border border-red-600'
                }`}
              />
              {formState?.errors.birthdate && (
                <p className="text-sm">{formState?.errors.birthdate}</p>
              )}
            </div>

            {formState?.errors._form && (
              <p className="rounded-md border-2 border-red-600 bg-red-200 p-2 text-sm font-medium text-red-700">
                {formState?.errors._form}
              </p>
            )}

            <DialogFooter>
              <BtnFormSubmit>Salvar</BtnFormSubmit>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
