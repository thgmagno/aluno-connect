'use client'

import React from 'react'
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
import DisplayErrorForm from '../common/display-error-form'
import { actions } from '@/actions'
import { PartialUser } from '@/lib/types'

export function UpsertStudentForm() {
  const [formState, action] = useFormState(
    actions.administrator.upsertStudent,
    {
      errors: {},
    },
  )
  const searchParams = useSearchParams()

  const modal = searchParams.get('modal')
  const data = searchParams.get('usuario') as string
  const user: PartialUser = JSON.parse(data)

  return (
    <>
      {/* CADASTRAR */}
      <Modal
        isOpen={modal === 'cadastrar'}
        placement="center"
        size="xl"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Cadastrar aluno
          </ModalHeader>
          <form action={action}>
            <ModalBody>
              <Input
                autoFocus
                name="name"
                label="Nome"
                variant="faded"
                isInvalid={!!formState?.errors.name}
                errorMessage={formState?.errors.name}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                variant="faded"
                isInvalid={!!formState?.errors.email}
                errorMessage={formState?.errors.email}
              />
              <Input
                name="birthdate"
                label="Data de nascimento"
                labelPlacement="outside-left"
                type="date"
                variant="faded"
                isInvalid={!!formState?.errors.birthdate}
                errorMessage={formState?.errors.birthdate}
              />
              {formState?.errors._form && (
                <DisplayErrorForm error={formState?.errors._form} />
              )}
            </ModalBody>
            <ModalFooter>
              <Link href="/alunos">
                <Button color="default">Cancelar</Button>
              </Link>
              <FormSubmit title="Salvar" />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* EDITAR */}
      <Modal
        isOpen={modal === 'editar'}
        placement="center"
        size="xl"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Editar aluno
          </ModalHeader>
          <form action={action}>
            <ModalBody>
              <input type="hidden" name="id" value={user?.id} />
              <Input
                autoFocus
                name="name"
                label="Nome"
                variant="faded"
                isInvalid={!!formState?.errors.name}
                errorMessage={formState?.errors.name}
                defaultValue={user?.name}
              />
              <Input
                name="email"
                label="E-mail"
                type="email"
                variant="faded"
                isInvalid={!!formState?.errors.email}
                errorMessage={formState?.errors.email}
                defaultValue={user?.email}
              />
              <Input
                name="birthdate"
                label="Data de nascimento"
                labelPlacement="outside-left"
                type="date"
                variant="faded"
                isInvalid={!!formState?.errors.birthdate}
                errorMessage={formState?.errors.birthdate}
                defaultValue={String(user?.birthdate).slice(0, 10)}
              />
              {formState?.errors._form && (
                <DisplayErrorForm error={formState?.errors._form} />
              )}
            </ModalBody>
            <ModalFooter>
              <Link href="/alunos">
                <Button color="default">Cancelar</Button>
              </Link>
              <FormSubmit title="Salvar" />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
