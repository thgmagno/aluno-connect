'use client'

import BtnFormSubmit from '@/components/common/btn-form-submit'
import { useFormState } from 'react-dom'
import * as actions from '@/actions/admin-actions'
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
  category: 'student' | 'parent' | 'instructor' | 'class'
}

export default function UpdateForm({
  id,
  name,
  email,
  birthdate,
  category,
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
    const [formState, action] = useFormState(actions.updateParent, {
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

  function updateClass({ id, courseName }: { id: string; courseName: string }) {
    const [formState, action] = useFormState(actions.updateClass, {
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
                formState.errors.course_name && 'text-red-600'
              }`}
            >
              <Label htmlFor="course_name">Nome do curso</Label>
              <Input
                type="text"
                name="course_name"
                defaultValue={courseName}
                className={`${formState.errors.course_name && 'bg-red-200'}`}
              />
              {formState.errors.course_name && (
                <p className="text-sm">{formState.errors.course_name}</p>
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

  return (
    <>
      {category === 'student' && updateStudent({ id, name, email, birthdate })}
      {category === 'instructor' && updateInstructor({ id, name, email })}
      {category === 'parent' && updateParent({ id, name, email })}
      {category === 'class' && updateClass({ id, courseName: name })}
    </>
  )
}
