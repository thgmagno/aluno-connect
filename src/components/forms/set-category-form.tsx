'use client'

import { actions } from '@/actions'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import DisplayErrorForm from '@/components/common/display-error-form'
import Link from 'next/link'
import FormSubmit from '@/components/common/form-submit'
import { mockCategories } from '@/lib/mock'

export default function SetCategoryForm() {
  const [formState, action] = useFormState(actions.administrator.setCategory, {
    errors: {},
  })

  const searchParams = useSearchParams()
  const id = searchParams.get('id') as string
  const modal = searchParams.get('modal')
  const pathname = usePathname()

  return (
    <Modal
      isOpen={modal === 'categoria'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>
          <h1>Incluir categoria</h1>
        </ModalHeader>
        <form action={action}>
          <ModalBody>
            <input type="hidden" name="id" value={id} />
            <Select label="Selecionar categoria" name="category">
              {mockCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>
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
