'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeOff, Eye } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import * as actions from '@/actions/auth-actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import BtnFormSubmit from '../common/btn-form-submit'

export default function SetPasswordForm({
  id,
  profile,
}: {
  id: string
  profile: string
}) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const handleSubmit = async (formData: FormData) => {
    const res = await actions.registerUserPassword(formData)

    const { success, error } = res
    success && toast.success(success) && router.replace('/entrar')
    error && toast.error(error)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>
          Vamos garantir que sua conta seja protegida.
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-3">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="profile" value={profile} />
          <div className="relative flex flex-col space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder="Informe uma senha segura"
            />
            <Button
              type="button"
              variant={'link'}
              className="absolute right-2 top-3.5 mt-2 p-2 text-zinc-500"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <Input
            type={visible ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirme a senha"
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <BtnFormSubmit>Salvar</BtnFormSubmit>
          <Link
            href="/primeiro-acesso"
            className="w-full text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
          >
            <Button type="button" variant={'outline'} className="w-full">
              Voltar
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
