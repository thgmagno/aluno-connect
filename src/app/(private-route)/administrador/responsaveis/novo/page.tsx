'use client'

import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as actions from '@/actions/admin-actions'
import BtnFormSubmit from '@/components/common/btn-form-submit'
import { Input } from '@/components/ui/input'
import { Navigation } from '@/components/common/navigation-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function AdmParentNew() {
  const [formState, action] = useFormState(actions.createParent, {
    errors: {},
  })

  return (
    <>
      <Navigation.container>
        <Link href="/administrador/responsaveis">
          <Button variant={'secondary'}>Cancelar</Button>
        </Link>
      </Navigation.container>

      {/* Formulário */}
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">Cadastrar Responsáveis</CardTitle>
        </CardHeader>
        <form action={action}>
          <CardContent className="flex flex-col gap-4">
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.name && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                name="name"
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
                className={`${formState.errors.email && 'bg-red-200'}`}
              />
              {formState.errors.email && (
                <p className="text-sm">{formState.errors.email}</p>
              )}
            </div>
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </CardContent>
        </form>
      </Card>
    </>
  )
}
