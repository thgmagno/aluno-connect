'use client'

import { PartialUser } from '@/lib/types'
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import Select from 'react-select'
import FormSubmit from '../common/form-submit'
import { actions } from '@/actions'
import { useFormState } from 'react-dom'
import DisplayErrorForm from '../common/display-error-form'

interface OptionsProps {
  value: number
  label: string
}

export default function LinkInstructorForm({
  instructorList,
}: {
  instructorList: PartialUser[]
}) {
  const [formState, action] = useFormState(
    actions.administrator.linkInstructorClassroom,
    {
      errors: {},
    },
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const id = searchParams.get('id') as string
  const vincular = searchParams.get('vincular')

  const options: OptionsProps[] = []

  instructorList.map((instructor) =>
    options.push({ value: instructor.id, label: instructor.name }),
  )

  return (
    <Modal
      isOpen={vincular === 'instrutores'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>
          <h1>Vincular instrutores</h1>
        </ModalHeader>
        <form action={action}>
          <ModalBody>
            <input type="hidden" name="classroomId" value={id} />
            <Select
              name="instructorList"
              options={options}
              isClearable
              isMulti
            />
            {formState?.errors._form && (
              <DisplayErrorForm error={formState.errors._form} />
            )}
          </ModalBody>
          <ModalFooter>
            <Link href={pathname}>
              <Button color="default">Cancelar</Button>
            </Link>
            <FormSubmit title="Vincular" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
