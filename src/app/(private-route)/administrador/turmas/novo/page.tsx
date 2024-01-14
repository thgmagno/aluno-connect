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

export default function AdmClassNew() {
  const [formState, action] = useFormState(actions.createClass, {
    errors: {},
  })

  return (
    <>
      <Navigation.container>
        <Link href="/administrador/turmas">
          <Button variant={'secondary'}>Cancelar</Button>
        </Link>
      </Navigation.container>

      {/* Formulário */}
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">Cadastrar Turma</CardTitle>
        </CardHeader>
        <form action={action}>
          <CardContent className="flex flex-col gap-4">
            <div
              className={`flex flex-col gap-2 ${
                formState.errors.course_name && 'text-red-600'
              }`}
            >
              <Label htmlFor="name">Nome do curso</Label>
              <Input
                type="text"
                name="course_name"
                className={`${formState.errors.course_name && 'bg-red-200'}`}
              />
              {formState.errors.course_name && (
                <p className="text-sm">{formState.errors.course_name}</p>
              )}
            </div>
            <BtnFormSubmit>Salvar</BtnFormSubmit>
          </CardContent>
        </form>
      </Card>
    </>
  )
}
