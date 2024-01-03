'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DeleteForm from '@/modules/common/components/delete-form'
import { updateStudentAccount } from '../actions/update'

export default async function EditStudentForm({
  id,
  name,
  email,
}: {
  id: string
  name: string
  email: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar aluno</CardTitle>
      </CardHeader>
      <form
        action={updateStudentAccount}
        className="mt-5 flex w-[300px] flex-col gap-2 p-2 sm:w-[400px] md:w-[500px]"
      >
        <CardContent>
          <input type="hidden" name="id" value={id} />
          <div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="name" className="mb-2">
                Nome:
              </Label>
              <Input type="text" name="name" defaultValue={name} />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="email" className="mb-2">
                E-mail:
              </Label>
              <Input type="text" name="email" defaultValue={email} />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="birthdate" className="mb-2">
                Data de aniversário:
              </Label>
              <Input type="date" name="birthdate" />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="class" className="mb-2">
                Turma(s):
              </Label>
              <Input type="text" name="class" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Label htmlFor="class" className="mb-2">
                Apagar registro do aluno:
              </Label>
              <DeleteForm id={id} name="Implementar" />
            </div>
          </div>
        </CardContent>
        <Button>Salvar</Button>
      </form>
    </Card>
  )
}
