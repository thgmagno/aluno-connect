'use client'

import { DeleteStudent } from '@/modules/administrator/actions/delete'
import toast from 'react-hot-toast'
import BtnPromise from './btn-promise'

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
      <BtnPromise title="Apagar" color="red" />
    </form>
  )
}
