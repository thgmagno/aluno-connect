'use client'

import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as actions from '@/actions'

export default function AdmStudentNew() {
  // the first argument must be an Server Action
  // the second argument must be a initial Form State
  const [formState, action] = useFormState(actions.createStudent, {
    message: '',
  })

  const nameError = formState.message.includes('nome')
  const emailError = formState.message.includes('email')

  return (
    <div className="relative top-20">
      {/* Botões */}
      <nav className="mb-4 flex justify-end gap-4">
        <Link href="/administrador/alunos">
          <Button variant={'secondary'}>Cancelar</Button>
        </Link>
      </nav>

      {/* Formulário */}
      <form action={action} className="rounded bg-neutral-200 p-2 shadow-md">
        <h3 className="mb-2 text-xl">Cadastrar aluno</h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              className={`rounded border-2 p-1 outline-none ${
                nameError ? 'border-red-400' : ''
              }`}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              className={`rounded border-2 p-1 outline-none ${
                emailError ? 'border-red-400' : ''
              }`}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="birthdate">Data de nascimento</label>
            <input type="date" name="birthdate" />
          </div>

          <div>{formState.message}</div>

          <Button
            type="submit"
            variant={'primary'}
            className="mx-auto my-2 w-[10rem] rounded p-2"
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}
