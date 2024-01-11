import { getStudentByID } from '@/actions/admin-actions'
import BtnFormSubmit from '@/components/common/btn-form-submit'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdmStudentEdit({
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
        <Link href={`/administrador/alunos`}>
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
              className={`rounded border-2 p-1 outline-none`}
              defaultValue={student?.name}
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
              defaultValue={student?.email}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthdate" className={`flex justify-between `}>
              Data de nascimento
            </label>
            <input
              type="date"
              name="date"
              className={`rounded border-2 p-1 outline-none`}
            />
          </div>
          <BtnFormSubmit title="Salvar" />
        </div>
      </form>
    </>
  )
}
