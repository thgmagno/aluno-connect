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
import { PlusCircle } from 'lucide-react'

export function Classroom() {
  // TODO: Criar Action de criar responsável
  // const [formState, action] = useFormState(Querys.Create., {
  //   errors: {},
  // })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="primary">
          <PlusCircle className="mr-1.5 h-4 w-4 truncate" strokeWidth={3} />
          Nova turma
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={''}>
          <DialogHeader>
            <DialogTitle>Cadastrar Turma</DialogTitle>
            <DialogDescription>
              Complete o formulário abaixo para cadastrar uma nova turma.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div
              // className={`flex flex-col gap-2 ${
              //   formState.errors.name && 'text-red-600'
              // }`}
              className={`flex flex-col gap-2`}
            >
              <Label htmlFor="name">Nome:</Label>
              <Input
                name="name"
                // className={`${formState.errors.name && 'border-red-600'}`}
              />
              {/* {formState.errors.name && (
                <p className="text-sm">{formState.errors.name}</p>
              )} */}
            </div>
            {/* {formState.errors._form && (
              <p className="rounded-md border-2 border-red-600 bg-red-200 p-2 text-red-600">
                {formState.errors._form}
              </p>
            )} */}
          </div>
          <DialogFooter>
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
