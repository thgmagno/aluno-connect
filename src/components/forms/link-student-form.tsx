'use client'

import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LinkStudentForm() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const vincular = searchParams.get('vincular')

  return (
    <Modal
      isOpen={vincular === 'alunos'}
      placement="center"
      size="xl"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>
          <h1>Vincular estudantes</h1>
        </ModalHeader>
        <form action="">
          <ModalBody>
            <p>implementar...</p>
          </ModalBody>
          <ModalFooter>
            <Link href={pathname}>Cancelar</Link>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
