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
import DisplayErrorForm from '@/components/common/display-error-form'
import { actions } from '@/actions'
import { Classroom } from '@/lib/types'

export function UpsertClassroomForm() {
  const [formState, action] = useFormState(
    actions.administrator.upsertClassroom,
    {
      errors: {},
    },
  )
  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')
  const data = searchParams.get('turma') as string
  const classroom: Classroom = JSON.parse(data)

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
            Cadastrar turma
          </ModalHeader>
          <form action={action}>
            <ModalBody>
              <input type="hidden" name="id" value="" />
              <Input
                autoFocus
                name="courseName"
                label="Nome do curso"
                variant="faded"
                isInvalid={!!formState?.errors.course_name}
                errorMessage={formState?.errors.course_name}
              />
              {formState?.errors._form && (
                <DisplayErrorForm error={formState?.errors._form} />
              )}
            </ModalBody>
            <ModalFooter>
              <Link href="/turmas">
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
            Editar turma
          </ModalHeader>
          <form action={action}>
            <ModalBody>
              <input type="hidden" name="id" value={classroom?.id} />
              <Input
                autoFocus
                name="courseName"
                label="Nome do curso"
                variant="faded"
                isInvalid={!!formState?.errors.course_name}
                errorMessage={formState?.errors.course_name}
                defaultValue={classroom?.course_name}
              />
              {formState?.errors._form && (
                <DisplayErrorForm error={formState?.errors._form} />
              )}
            </ModalBody>
            <ModalFooter>
              <Link href="/turmas">
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
