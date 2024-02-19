'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from '@nextui-org/react'
import { useFormState } from 'react-dom'
import FormSubmit from '@/components/common/form-submit'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PartialUser } from '@/lib/types'
import DisplayErrorForm from '../common/display-error-form'
import { actions } from '@/actions'

export function UpdateStudentForm() {
  const [formState, action] = useFormState(
    actions.administrator.updateStudent,
    {
      errors: {},
    },
  )

  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')
  const user = searchParams.get('user') as string
  const parsedUser: PartialUser = JSON.parse(user)

  return (
    <Modal
      isOpen={modal === 'editar'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Editar aluno</ModalHeader>
        <form action={action}>
          <ModalBody>
            <input type="hidden" name="id" value={parsedUser?.id} />
            <Input
              autoFocus
              name="name"
              label="Nome"
              variant="faded"
              isInvalid={!!formState?.errors.name}
              errorMessage={formState?.errors.name}
              defaultValue={parsedUser?.name}
            />
            <Input
              name="email"
              label="E-mail"
              type="email"
              variant="faded"
              isInvalid={!!formState?.errors.email}
              errorMessage={formState?.errors.email}
              defaultValue={parsedUser?.email}
            />
            <Input
              name="birthdate"
              label="Data de nascimento"
              labelPlacement="outside-left"
              type="date"
              variant="faded"
              isInvalid={!!formState?.errors.birthdate}
              errorMessage={formState?.errors.birthdate}
              defaultValue={String(parsedUser?.birthdate).slice(0, 10)}
            />
            {formState?.errors._form && (
              <DisplayErrorForm error={formState?.errors._form} />
            )}
          </ModalBody>
          <ModalFooter>
            <Link href="/adm/alunos">
              <Button color="default">Cancelar</Button>
            </Link>
            <FormSubmit title="Salvar" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
