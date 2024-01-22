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
import BtnFormSubmit from '../common/btn-form-submit'
import Querys from '@/actions/querys'
import { useFormState } from 'react-dom'
import { Frequency } from '@prisma/client'

interface Props {
  data: Frequency
}

export default function NewRequest({ data }: Props) {
  const [formState, action] = useFormState(Querys.Create.Request, {
    errors: {},
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Justificar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Solicitação de Falta</DialogTitle>
            <DialogDescription>
              Envie uma justificativa para que possamos entender melhor a
              situação.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <input type="hidden" name="frequencyId" value={data.id} />
            <input type="hidden" name="studentId" value={data.studentId} />
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.justification && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Justificativa:</Label>
              <textarea
                name="justification"
                className={`h-20 rounded-md border p-2 ${
                  formState.errors.justification && 'border-red-600'
                }`}
              />
              {formState.errors.justification && (
                <p className="text-sm">{formState.errors.justification}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="username"
                className={`${formState.errors.media && 'text-red-600'}`}
              >
                Enviar um documento
              </Label>
              <Input
                type="file"
                name="media"
                className={`col-span-3 ${
                  formState.errors.media && 'border border-red-600'
                }`}
              />
              {formState.errors.media && (
                <p className="text-sm">{formState.errors.media}</p>
              )}
            </div>
            {formState.errors._form && (
              <p className="rounded-md border-2 border-red-600 bg-red-200 p-2 text-red-600">
                {formState.errors._form}
              </p>
            )}
          </div>
          <DialogFooter>
            <BtnFormSubmit>Enviar</BtnFormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
