'use client'

import CreateEntity from '@/actions/create'
import BtnFormSubmit from '@/components/common/btn-form-submit'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'

export function student() {
  const [formState, action] = useFormState(CreateEntity.student, {
    errors: {},
  })

  return (
    <Card className="mx-auto mt-5 max-w-xl">
      <CardContent className="py-5">
        <form action={action} className="flex flex-col gap-2">
          <div
            className={`mb-2 flex flex-col gap-2 ${
              formState.errors.name && 'text-red-600'
            }`}
          >
            <Label>Nome</Label>
            <Input
              type="text"
              name="name"
              className={`${formState.errors.name && 'border border-red-600'}`}
            />
            {formState.errors.email && (
              <p className="text-sm">{formState.errors.name}</p>
            )}
          </div>
          <div
            className={`mb-2 flex flex-col gap-2 ${
              formState.errors.birthdate && 'text-red-600'
            }`}
          >
            <Label>E-mail</Label>
            <Input
              type="email"
              name="email"
              className={`${formState.errors.email && 'border border-red-600'}`}
            />
            {formState.errors.email && (
              <p className="text-sm">{formState.errors.email}</p>
            )}
          </div>
          <div
            className={`mb-2 flex flex-col gap-2 ${
              formState.errors.name && 'text-red-600'
            }`}
          >
            <Label>Data de nascimento</Label>
            <Input
              type="date"
              name="birthdate"
              className={`${
                formState.errors.birthdate && 'border border-red-600'
              }`}
            />
            {formState.errors.birthdate && (
              <p className="text-sm">{formState.errors.birthdate}</p>
            )}
          </div>
          <BtnFormSubmit>Salvar</BtnFormSubmit>
        </form>
      </CardContent>
    </Card>
  )
}
