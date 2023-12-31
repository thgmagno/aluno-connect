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
import Link from 'next/link'

export default function SetPasswordForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Aluno Connect</CardTitle>
        <CardDescription>
          Vamos garantir que sua conta seja protegida.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="">E-mail</Label>
              <Input type="text" value={'[e-mail do usuário]'} disabled />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                placeholder="Informe uma senha segura"
              />
              <Input type="password" placeholder="Confirme a senha" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href="primeiro-acesso"
          className="text-sm text-sky-600 transition-all duration-300 hover:font-semibold"
        >
          <Button variant={'outline'}>Voltar</Button>
        </Link>
        <Button className="bg-emerald-700 hover:bg-emerald-800">Salvar</Button>
      </CardFooter>
    </Card>
  )
}
