'use client'

import { Student } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import BtnFormSubmit from '@/components/common/btn-form-submit'
import { useFormState } from 'react-dom'
import { mutation } from '@/db/mutation'

interface Props {
  classroomId: string
  students: Student[]
}

export function FrequencyForm({ classroomId, students }: Props) {
  const [formState, action] = useFormState(mutation.newFrequency, {
    success: false,
    errors: {},
  })

  return (
    <form action={action} className="mx-auto max-w-xl space-y-5">
      <input type="hidden" name="length" value={students.length} />
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nº</TableHead>
            <TableHead>Aluno</TableHead>
            <TableHead className="text-center">Presença</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-semibold">{student.name}</TableCell>
              <TableCell>
                <input type="hidden" name="classId" value={classroomId} />
                <input
                  type="hidden"
                  name={`studentId${index.toString()}`}
                  value={student.id}
                />
                <Input
                  type="checkbox"
                  name={`status${index.toString()}`}
                  className="h-6"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {formState.errors._form && (
        <span className="mt-5 flex rounded border-2 border-red-400 bg-red-200 p-2 font-semibold text-zinc-700">
          {formState.errors._form}
        </span>
      )}

      {formState.success && (
        <span className="mt-5 flex rounded border-2 border-emerald-400 bg-emerald-200 p-2 font-semibold text-zinc-700">
          Frequência registrada
        </span>
      )}

      <BtnFormSubmit>Salvar</BtnFormSubmit>
    </form>
  )
}
