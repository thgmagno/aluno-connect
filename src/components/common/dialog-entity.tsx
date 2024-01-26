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
import { useFormState } from 'react-dom'
import { UpsertInstructor } from '@/actions/crud/upsert-instructor'
import { Class, Instructor, Parent, Student, Frequency } from '@prisma/client'
import { UpsertStudent } from '@/actions/crud/upsert-student'
import { ReactNode } from 'react'
import { CreateRequest } from '@/actions/crud/create-request'

interface Props {
  category: 'instructor' | 'student' | 'parent' | 'class' | 'request'
  data?: Instructor | Student | Parent | Class | Frequency
  children?: ReactNode
}

interface InstructorProps {
  data: Instructor
  children: ReactNode
}

interface StudentProps {
  data: Student
  children: ReactNode
}

interface ParentProps {
  data: Parent
  children: ReactNode
}

interface ClassProps {
  data: Class
  children: ReactNode
}

function Instructor({ data, children }: InstructorProps) {
  const [formState, action] = useFormState(UpsertInstructor, {
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
            <DialogTitle>Cadastrar Instrutor</DialogTitle>
            <DialogDescription>
              Complete o formulário abaixo para cadastrar um novo instrutor.
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

function Student({ data, children }: StudentProps) {
  const [formState, action] = useFormState(UpsertStudent, {
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

function Request({ data }: { data: Frequency }) {
  const [formState, action] = useFormState(CreateRequest, {
    errors: {},
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="primary">
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
              <Label htmlFor="justification">Justificativa:</Label>
              <textarea
                name="justification"
                className={`h-20 rounded-md border p-2 text-sm md:text-base ${
                  formState.errors.justification && 'border-red-600'
                }`}
              />
              {formState.errors.justification && (
                <p className="text-sm">{formState.errors.justification}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="media"
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

function Classroom({ data, children }: ClassProps) {
  // TODO: Action create class
  const [formState, action] = useFormState(CreateRequest, {
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
            <DialogTitle>Cadastrar turma</DialogTitle>
            <DialogDescription>
              Complete o formulário abaixo para cadastrar uma nova turma.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <input type="hidden" name="id" value={data?.id} />
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="courseName"
                className={`${formState.errors.media && 'text-red-600'}`}
              >
                Nome do curso
              </Label>
              <Input
                type="text"
                name="courseName"
                defaultValue={data?.course_name}
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

export function DialogEntity({ category, data, children }: Props) {
  return (
    <>
      {category === 'instructor' && (
        <Instructor data={data as Instructor}>{children}</Instructor>
      )}
      {category === 'student' && (
        <Student data={data as Student}>{children}</Student>
      )}
      {category === 'request' && <Request data={data as Frequency} />}
      {category === 'class' && (
        <Classroom data={data as Class} children={children} />
      )}
    </>
  )
}
