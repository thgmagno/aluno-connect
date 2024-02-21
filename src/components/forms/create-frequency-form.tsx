'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import RenderList from '../common/render-list'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { Classroom, PartialUser } from '@/lib/types'
import FormSubmit from '../common/form-submit'
import { useFormState } from 'react-dom'
import { actions } from '@/actions'
import DisplayErrorForm from '../common/display-error-form'
import Link from 'next/link'

export default function CreateFrequencyForm({
  studentList,
  classroom,
}: {
  studentList: PartialUser[]
  classroom: Classroom | null
}) {
  const [formState, action] = useFormState(
    actions.instructor.createClassroomFrequency,
    {
      errors: {},
    },
  )
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const modal = searchParams.get('modal')

  return (
    <Modal
      isOpen={modal === 'chamada'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h1>Realizar chamada</h1>
          <p className="text-sm">{classroom?.course_name}</p>
        </ModalHeader>
        <form action={action}>
          <ModalBody>
            <input type="hidden" name="classroom_id" value={classroom?.id} />
            <input
              type="hidden"
              name="course_name"
              value={classroom?.course_name}
            />
            <RenderList createFrequency={studentList} />
            {formState.errors._form && (
              <DisplayErrorForm error={formState.errors._form} />
            )}
          </ModalBody>
          <ModalFooter>
            <Link href={pathname}>
              <Button>Cancelar</Button>
            </Link>
            <FormSubmit title="Registrar" />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
