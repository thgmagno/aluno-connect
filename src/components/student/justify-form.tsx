'use client'

import BtnFormSubmit from '@/components/common/btn-form-submit'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SendEmail from '@/services/send-email'
import { useFormState } from 'react-dom'

export default function JustificationForm({
  frequencyId,
  studentId,
  studentName,
}: {
  frequencyId: string
  studentId: string
  studentName: string
}) {
  const [formState, action] = useFormState(SendEmail, {
    errors: {},
  })

  return (
    <form action={action}>
      <input type="hidden" name="frequencyId" value={frequencyId} />
      <input type="hidden" name="studentId" value={studentId} />
      <input type="hidden" name="studentName" value={studentName} />
      <input type="hidden" name="date" />
      <div
        className={`flex flex-col gap-2 ${
          formState.errors.justification && 'text-red-600'
        }`}
      >
        <textarea
          name="justification"
          cols={30}
          rows={5}
          placeholder="Fornecer uma breve explicação ou justificativa irá nos ajudar a compreender melhor a situação."
          className={`w-full rounded-md border-2 border-zinc-200 p-2 ${
            formState.errors.justification && 'bg-red-200'
          }`}
        />
        {formState.errors.justification && (
          <p className="text-sm">{formState.errors.justification}</p>
        )}
      </div>
      <div className="my-4 flex w-full flex-col">
        <Label htmlFor="picture" className="mb-2.5">
          Selecionar imagem:
        </Label>
        <Input name="picture" type="file" />
      </div>
      <BtnFormSubmit>Enviar</BtnFormSubmit>
    </form>
  )
}
