'use client'

import { DeleteStudent } from '@/modules/administrator/actions/delete'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

function DeleteButton() {
  const { pending } = useFormStatus()

  return <button type="submit">{pending ? 'Aguarde...' : 'Apagar'}</button>
}

export default function DeleteForm({ id, name }: { id: string; name: string }) {
  const handleDelete = async (formData: FormData) => {
    const res = await DeleteStudent(formData)

    res.success && toast.success(res.success)
    res.error && toast.error(res.error)
  }

  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="name" value={name} />
      <DeleteButton />
    </form>
  )
}
