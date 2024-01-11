'use client'

import BtnFormSubmit from '@/components/common/btn-form-submit'
import { useFormState } from 'react-dom'
import * as actions from '@/actions/admin-actions'

interface UpdateStudentProps {
  id: string
  name: string
  email: string
}

export default function UpdateStudentForm({
  id,
  name,
  email,
}: UpdateStudentProps) {
  const [formState, action] = useFormState(actions.updateStudent, {
    message: '',
  })

  return (
    <form
      action={action}
      className="mx-auto max-w-lg rounded bg-neutral-200 p-2 shadow-md"
    >
      <div className="flex flex-col gap-4">
        <input type="hidden" name="id" value={id} />
        <div className="flex flex-col">
          <label htmlFor="name" className={`flex justify-between`}>
            Nome
          </label>
          <input
            type="text"
            name="name"
            className={`rounded border-2 p-1 outline-none`}
            defaultValue={name}
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
            defaultValue={email}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthdate" className={`flex justify-between `}>
            Data de nascimento
          </label>
          <input
            type="date"
            name="birthdate"
            className={`rounded border-2 p-1 outline-none`}
          />
        </div>
        {formState.message && <p>{formState.message}</p>}
        <BtnFormSubmit title="Salvar" />
      </div>
    </form>
  )
}
