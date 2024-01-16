'use client'

import * as actions from '@/actions/instructor-actions'
import * as Table from '@/components/common/table'
import SwitchFrequency from '@/components/instructor/switch-frequency'
import { useFormState } from 'react-dom'
import BtnFormSubmit from '../common/btn-form-submit'

interface FrequencyListProps {
  students: {
    id: number
    studentId: string
    classId: string
    studentID: {
      id: string
      name: string
      email: string
      password: string | null
      birthdate: Date
      firstAccess: boolean
    }
  }[]
}

export default function FrequencyListForm({ students }: FrequencyListProps) {
  const [formState, action] = useFormState(actions.markFrequency, {
    success: false,
    errors: {},
  })

  return (
    <form action={action} className="mx-auto flex max-w-xl flex-col gap-4">
      {formState.errors._form && (
        <p className="rounded-md border-2 border-red-400 bg-red-200 p-2 font-semibold text-red-700">
          {formState.errors._form}
        </p>
      )}
      {formState.success && (
        <p className="rounded-md border-2 border-green-400 bg-green-200 p-2 font-semibold text-green-700">
          Frequência registrada!
        </p>
      )}
      <Table.Content>
        <Table.Header>
          <Table.Cell>Nome do aluno</Table.Cell>
          <Table.Cell>Frequência</Table.Cell>
        </Table.Header>
        <Table.Body>
          <input type="hidden" name="length" value={students.length} />
          {students.map((student, index) => (
            <Table.Row key={student.id}>
              <Table.Cell>{student.studentID.name}</Table.Cell>
              <Table.Cell>
                <SwitchFrequency
                  index={index}
                  studentID={student.studentID.id}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
      <BtnFormSubmit>Finalizar</BtnFormSubmit>
    </form>
  )
}
