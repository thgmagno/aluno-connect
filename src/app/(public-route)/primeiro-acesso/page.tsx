import { Input } from '@/components/ui/input'

export default function FirstAccess() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-10">
      <h1>Página de primeiro acesso</h1>
      <Input type="text" placeholder="Informe o seu e-mail" />
    </main>
  )
}
