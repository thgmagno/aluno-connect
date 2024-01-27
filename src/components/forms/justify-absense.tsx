'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import SendJustification from '@/actions/send-justification'

interface Props {
  frequencyId: string
  studentId: string
  courseName: string
  studentName: string
  frequencyDate: Date
}

export default function JustifyAbsense({
  frequencyId,
  studentId,
  courseName,
  studentName,
  frequencyDate,
}: Props) {
  const [formState, action] = useFormState(SendJustification, {
    errors: {},
  })

  return (
    <form action={action} className="space-y-5">
      {/* Metadata */}
      <input type="hidden" name="frequencyId" value={frequencyId} />
      <input type="hidden" name="studentId" value={studentId} />
      <input type="hidden" name="courseName" value={courseName} />
      <input type="hidden" name="studentName" value={studentName} />
      <input type="hidden" name="frequencyDate" value={String(frequencyDate)} />

      {/* Inputs */}
      <div className="space-y-2">
        <Label htmlFor="justification">Jusitificativa:</Label>
        <Input type="text" name="justification" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="media">Anexar documento:</Label>
        <Input type="file" name="media" />
      </div>

      {formState.errors && <p>{JSON.stringify(formState.errors)}</p>}

      <DialogFooter>
        <Button type="submit">Enviar para análise</Button>
      </DialogFooter>
    </form>
  )
}
