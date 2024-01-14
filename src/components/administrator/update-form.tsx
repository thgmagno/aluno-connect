'use client'

import BtnFormSubmit from '@/components/common/btn-form-submit'
import { useFormState } from 'react-dom'
import * as actions from '@/actions/admin-actions'
import { UserType } from '@/lib/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface UpdateProps {
  id: string
  name: string
  email: string
  birthdate: Date
  profile: UserType
}

export default function UpdateForm({
  id,
  name,
  email,
  birthdate,
  profile,
}: UpdateProps) {
  function updateStudent({
    id,
    name,
    email,
    birthdate,
  }: {
    id: string
    name: string
    email: string
    birthdate: Date
  }) {
    const [formState, action] = useFormState(actions.updateStudent, {
      errors: {},
    })

    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">Atualizar cadastro</CardTitle>
        </CardHeader>
        <form action={action}>
          <CardContent className="flex flex-col gap-4">
            <Input type="hidden" name="id" value={id} />
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.name && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                name="name"
                defaultValue={name}
                className={`${formState.errors.name && 'bg-red-200'}`}
              />
              {formState.errors.name && (
                <p className="text-sm">{formState.errors.name}</p>
              )}
            </div>
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.email && 'text-red-600'
              }`}
            >
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                name="email"
                defaultValue={email}
                className={`${formState.errors.email && 'bg-red-200'}`}
              />
              {formState.errors.email && (
                <p className="text-sm">{formState.errors.email}</p>
              )}
            </div>
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.birthdate && 'text-red-600'
              }`}
            >
              <Label htmlFor="email">Data de nascimento</Label>
              <Input
                type="date"
                name="birthdate"
                defaultValue={birthdate?.toISOString().slice(0, 10)}
                className={`${formState.errors.birthdate && 'bg-red-200'}`}
              />
              {formState.errors.birthdate && (
                <p className="text-sm">{formState.errors.birthdate}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {formState.errors._form && (
              <p className="text-sm">{formState.errors._form}</p>
            )}
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </CardFooter>
        </form>
      </Card>
    )
  }

  function updateInstructor({
    id,
    name,
    email,
  }: {
    id: string
    name: string
    email: string
  }) {
    const [formState, action] = useFormState(actions.updateInstructor, {
      errors: {},
    })

    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">Atualizar cadastro</CardTitle>
        </CardHeader>
        <form action={action}>
          <CardContent className="flex flex-col gap-4">
            <Input type="hidden" name="id" value={id} />
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.name && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                name="name"
                defaultValue={name}
                className={`${formState.errors.name && 'bg-red-200'}`}
              />
              {formState.errors.name && (
                <p className="text-sm">{formState.errors.name}</p>
              )}
            </div>
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.email && 'text-red-600'
              }`}
            >
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                name="email"
                defaultValue={email}
                className={`${formState.errors.email && 'bg-red-200'}`}
              />
              {formState.errors.email && (
                <p className="text-sm">{formState.errors.email}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {formState.errors._form && (
              <p className="text-sm">{formState.errors._form}</p>
            )}
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </CardFooter>
        </form>
      </Card>
    )
  }

  function updateParent({
    id,
    name,
    email,
  }: {
    id: string
    name: string
    email: string
  }) {
    const [formState, action] = useFormState(actions.updateStudent, {
      errors: {},
    })

    return (
      <form
        action={action}
        className="mx-auto max-w-lg rounded bg-neutral-200 p-2 shadow-md"
      >
        <div className="flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <div className="flex flex-col">
            <label htmlFor="name" className={`flex justify-between`}>
              Nome
            </label>
            <input
              type="text"
              name="name"
              className={`rounded border-2 p-1 outline-none`}
              defaultValue={name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className={`flex justify-between`}>
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className={`rounded border-2 p-1 outline-none`}
              defaultValue={email}
            />
          </div>
          {formState.errors._form && <p>{formState.errors._form}</p>}
          <BtnFormSubmit>Salvar</BtnFormSubmit>
        </div>
      </form>
    )
  }

  return (
    <>
      {profile === 'student' && updateStudent({ id, name, email, birthdate })}
      {profile === 'instructor' && updateInstructor({ id, name, email })}
      {profile === 'parent' && updateParent({ id, name, email })}
    </>
  )
}
