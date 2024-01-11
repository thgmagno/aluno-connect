'use client'

import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as actions from '@/actions/admin-actions'
import BtnFormSubmit from '@/components/common/btn-form-submit'

export default function AdmStudentNew() {
  // the first argument must be an Server Action
  // the second argument must be a initial Form State
  const [formState, action] = useFormState(actions.createStudent, {
    message: '',
  })

  const nameError = formState.message.includes('nome')
  const emailError = formState.message.includes('email')
  const birthError = formState.message.includes('data')
  const genericError =
    formState.message && !nameError && !emailError && !birthError

  return (
    <>
      {/* Botões */}
      <nav className="mb-4 flex justify-end gap-4">
        <Link href="/administrador/alunos">
          <Button variant={'secondary'}>Cancelar</Button>
        </Link>
      </nav>

      {/* Formulário */}
      <form
        action={action}
        className="mx-auto max-w-lg rounded bg-neutral-200 p-2 shadow-md"
      >
        <h3 className="mb-2 text-xl">Cadastrar aluno</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className={`flex justify-between ${
                nameError && 'font-semibold text-red-500'
              }`}
            >
              Nome
              {nameError && <p className="text-sm">{formState.message}</p>}
            </label>
            <input
              type="text"
              name="name"
              className={`rounded border-2 p-1 outline-none ${
                nameError && 'border-red-400'
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`flex justify-between ${
                emailError && 'font-semibold text-red-500'
              }`}
            >
              E-mail
              {emailError && <p className="text-sm">{formState.message}</p>}
            </label>
            <input
              type="email"
              name="email"
              className={`rounded border-2 p-1 outline-none ${
                emailError && 'border-red-400'
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="birthdate"
              className={`flex justify-between ${
                birthError && 'font-semibold text-red-500'
              }`}
            >
              Data de nascimento
              {birthError && <p className="text-sm">{formState.message}</p>}
            </label>
            <input
              type="date"
              name="birthdate"
              className={`rounded border-2 p-1 outline-none ${
                birthError && 'border-red-400'
              }`}
            />
          </div>

          {genericError && (
            <p className="rounded-md border-2 border-red-400 bg-red-200 p-2 font-semibold text-red-700">
              {formState.message}
            </p>
          )}

          <BtnFormSubmit title="Salvar" />
        </div>
      </form>
    </>
  )
}
