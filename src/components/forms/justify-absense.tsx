'use client'

import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from '@nextui-org/react'
import FormSubmit from '../common/form-submit'
import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { api } from '@/api'
import Link from 'next/link'
import { FormatDate } from '@/utils/format-date'
import DisplayErrorForm from '../common/display-error-form'

export default function JustifyAbsenseForm() {
  const [formState, action] = useFormState(api.create.request, {
    errors: {},
  })
  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')
  const id = searchParams.get('id') as string
  const date = searchParams.get('data') as string
  const parsedDate = JSON.parse(date)

  return (
    <Modal
      isOpen={modal === 'justificar'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1>Justificar falta de {FormatDate(parsedDate)}</h1>
        </ModalHeader>
        <form action={action}>
          <ModalBody>
            {/* TODO: IMPLEMENTAR */}

            {/* Pegar da Sessão */}
            <input type="hidden" name="student_id" value={1} />
            <input type="hidden" name="parent_id" value={''} />
            <input type="hidden" name="student_name" value={'Implementar'} />

            <input type="hidden" name="frequency_id" value={id} />
            <Input
              autoFocus
              name="justification"
              label="Justificativa"
              variant="faded"
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
            <Link href="/frequencia">
              <Button color="default">Cancelar</Button>
            </Link>
            <FormSubmit title="Salvar" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
