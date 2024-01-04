'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createStudentAccount } from '@/modules/administrator/actions/create'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default async function CreateStudentForm() {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const res = await createStudentAccount(formData)

    res.success && toast.success(res.success) && router.replace('/alunos')
    res.error && toast.error(res.error)
  }

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Cadastrar aluno</CardTitle>
      </CardHeader>
      <form
        action={handleSubmit}
        className="flex w-[300px] flex-col gap-2 p-2 sm:w-[400px] md:w-[500px]"
      >
        <CardContent>
          <input type="hidden" name="id" value={'id'} />
          <div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="name" className="mb-2">
                Nome:
              </Label>
              <Input type="text" name="name" />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="email" className="mb-2">
                E-mail:
              </Label>
              <Input type="email" name="email" />
            </div>
            <div className="mb-4 flex flex-col">
              <Label htmlFor="birthdate" className="mb-2">
                Data de aniversário:
              </Label>
              <Input type="date" name="birthdate" />
            </div>
          </div>
        </CardContent>
        <Button>Salvar</Button>
      </form>
    </Card>
  )
}
