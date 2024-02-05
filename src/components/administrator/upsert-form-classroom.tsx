'use client'

import { mutation } from '@/db/mutation'
import { Classroom } from '@prisma/client'
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
  data?: Classroom
}

export function UpsertFormClassroom({ data }: Props) {
  const [formState, action] = useFormState(mutation.upsertClassroom, {
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
        <form action={action} className="space-y-5">
          {/* Metadata */}
          <input type="hidden" name="id" value={data?.id} />

          {/* Nome */}
          <div
            className={`space-y-2 ${
              formState?.errors.course_name && 'text-red-600'
            }`}
          >
            <Label htmlFor="courseName">Nome do curso</Label>
            <Input
              type="text"
              name="courseName"
              defaultValue={data?.course_name}
              className={`${
                formState?.errors.course_name && 'border border-red-600'
              }`}
            />
            {formState?.errors.course_name && (
              <p className="text-sm">{formState?.errors.course_name}</p>
            )}
          </div>

          {/* Alunos */}
          <div className={`space-y-2`}>
            <Label htmlFor="students">Alunos</Label>
            <Input type="text" name="students" />
          </div>

          {/* Instrutores */}
          <div className={`space-y-2`}>
            <Label htmlFor="instrutores">Instrutores</Label>
            <Input type="text" name="instrutores" />
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
