'use client'

import BtnFormSubmit from '@/components/common/btn-form-submit'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import type { Frequency } from '@prisma/client'
import CreateEntity from '@/actions/create'

interface Props {
  data: Frequency
}

export function request({ data }: Props) {
  const [formState, action] = useFormState(CreateEntity.request, {
    errors: {},
  })

  return (
    <Card className="mx-auto mt-5 max-w-xl">
      <p className="mt-2 text-center text-muted-foreground">
        {data.date.toLocaleDateString('pt-br', { dateStyle: 'long' })}
      </p>
      <CardContent className="py-5">
        <form action={action} className="flex flex-col gap-2">
          <div
            className={`mb-2 flex flex-col gap-2 ${
              formState.errors.justification && 'text-red-600'
            }`}
          >
            <Label>Motivo</Label>
            <textarea
              name="justification"
              className={`rounded-md border p-1.5 ${
                formState.errors.justification && 'border-red-600'
              }`}
            />
            {formState.errors.justification && (
              <p className="text-sm">{formState.errors.justification}</p>
            )}
          </div>
          <div
            className={`mb-2 flex flex-col gap-2 ${
              formState.errors.media && 'text-red-600'
            }`}
          >
            <Label>Anexar documento</Label>
            <Input
              type="file"
              name="media"
              className={`${formState.errors.media && 'border border-red-600'}`}
            />
            {formState.errors.media && (
              <p className="text-sm">{formState.errors.media}</p>
            )}
          </div>
          <BtnFormSubmit>Salvar</BtnFormSubmit>
        </form>
      </CardContent>
    </Card>
  )
}
