'use client'

import { mutation } from '@/db/mutation'
import { Parent } from '@prisma/client'
import { useFormState } from 'react-dom'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import BtnFormSubmit from '@/components/common/btn-form-submit'
import { Button } from '@/components/ui/button'
import { Edit, PlusCircle } from 'lucide-react'

interface Props {
  data?: Parent
}

export function UpsertFormParent({ data }: Props) {
  const [formState, action] = useFormState(mutation.upsertParent, {
    errors: {},
  })

  return (
    <Dialog>
      {data ? (
        <DialogTrigger>
          <Edit className="mr-2 h-5 w-5" />
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild className="flex">
          <Button variant="emerald" className="mb-5 ml-auto">
            <PlusCircle className="mr-2 h-5 w-5" /> Cadastrar
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <form action={action} className="space-y-3">
          {/* Metadata */}
          <input type="hidden" name="id" value={data?.id} />

          {/* Nome */}
          <div
            className={`space-y-2 ${formState?.errors.name && 'text-red-600'}`}
          >
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              defaultValue={data?.name}
              className={`${formState?.errors.name && 'border border-red-600'}`}
            />
            {formState?.errors.name && (
              <p className="text-sm">{formState?.errors.name}</p>
            )}
          </div>

          {/* E-mail */}
          <div
            className={`space-y-2 ${formState?.errors.email && 'text-red-600'}`}
          >
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              defaultValue={data?.email}
              className={`${
                formState?.errors.email && 'border border-red-600'
              }`}
            />
            {formState?.errors.email && (
              <p className="text-sm">{formState?.errors.email}</p>
            )}
          </div>

          {formState?.errors._form && (
            <p className="rounded-md border-2 border-red-500 bg-red-200 p-2 text-red-700">
              {formState.errors._form}
            </p>
          )}

          <DialogFooter>
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
