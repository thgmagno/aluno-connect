import { getStudentByID } from '@/actions/admin-actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Edit, RotateCcw, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdmStudentNew({
  params,
}: {
  params: { id: string }
}) {
  const { student } = await getStudentByID(params.id)
  if (!student) redirect('/administrador/alunos')

  return (
    <>
      {/* TODO: implements composition pattern */}
      <nav className="mb-4 flex justify-end">
        <Link href="/administrador/alunos">
          <Button variant={'secondary'}>Voltar</Button>
        </Link>
      </nav>

      {/* Formulário */}
      <form
        action=""
        className="mx-auto max-w-lg rounded bg-neutral-200 p-2 shadow-md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className={`flex justify-between`}>
              Nome
            </label>
            <input
              type="text"
              name="name"
              className={`cursor-default rounded border-2 p-1 outline-none`}
              defaultValue={student?.name}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className={`flex justify-between`}>
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className={`cursor-default rounded border-2 p-1 outline-none`}
              defaultValue={student?.email}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthdate" className={`flex justify-between `}>
              Data de nascimento
            </label>
            <input
              type="text"
              name="date"
              className={`cursor-default rounded border-2 p-1 outline-none`}
              defaultValue={student?.birthdate.toLocaleDateString('pt-br', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              readOnly
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Opções avançadas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 font-semibold">
              <DropdownMenuItem className="h-10">
                <Edit size={20} className="mr-2" />
                <Link href={`/administrador/alunos/${student.id}/editar`}>
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-10">
                <RotateCcw size={20} className="mr-2" /> Resetar senha
              </DropdownMenuItem>
              <DropdownMenuItem className="h-10">
                <Trash2 size={20} className="mr-2" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </>
  )
}
