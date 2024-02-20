'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
} from '@nextui-org/react'
import FormSubmit from '../common/form-submit'
import { useFormState } from 'react-dom'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FormatDate } from '@/utils/format-date'
import DisplayErrorForm from '../common/display-error-form'
import { actions } from '@/actions'
import { userStore } from '@/store/user'
import { Frequency } from '@/lib/types'

export default function JustifyAbsenseForm() {
  const [formState, action] = useFormState(actions.student.sendJustification, {
    errors: {},
  })
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const modal = searchParams.get('modal')
  const data = searchParams.get('dados') as string
  const parsedData: Frequency = JSON.parse(data)

  const { user } = userStore()

  return (
    <Modal
      isOpen={modal === 'justificar'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1>Justificar falta de {FormatDate(parsedData?.date)}</h1>
        </ModalHeader>
        <form action={action}>
          <ModalBody>
            <input type="hidden" name="student_id" value={user?.id} />
            <input type="hidden" name="parent_id" value={''} />
            <input type="hidden" name="student_name" value={user?.name} />
            <input
              type="hidden"
              name="course_name"
              value={parsedData?.classroom_name}
            />
            <input
              type="hidden"
              name="dateOfAbsense"
              value={String(parsedData?.date)}
            />
            <input
              type="hidden"
              name="classroom_id"
              value={parsedData?.classroom_id}
            />

            <input type="hidden" name="frequency_id" value={parsedData?.id} />
            <Textarea
              autoFocus
              name="justification"
              variant="faded"
              placeholder="Escreva uma justificativa para ajudarmos a entender melhor a situação"
              isInvalid={!!formState?.errors.justification}
              errorMessage={formState?.errors.justification}
            />
            <Input
              name="file"
              type="file"
              variant="faded"
              isInvalid={false}
              errorMessage={''}
            />
            {formState?.errors._form && (
              <DisplayErrorForm error={formState.errors._form} />
            )}
          </ModalBody>
          <ModalFooter>
            <Link href={pathname}>
              <Button>Cancelar</Button>
            </Link>
            <FormSubmit title="Enviar" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
