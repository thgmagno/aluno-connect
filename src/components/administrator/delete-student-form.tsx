'use client'

import { Trash2 } from 'lucide-react'
import * as actions from '@/actions/admin-actions'
import toast from 'react-hot-toast'

interface DeleteStudentProps {
  id: string
  profile: string
}

export default function DeleteStudentForm({ id, profile }: DeleteStudentProps) {
  async function handleSubmit(formData: FormData) {
    const id = formData.get('id') as string

    const res = await actions.deleteStudent(id)

    res.message && toast.success(res.message)
    res.error && toast.error(res.error)
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="profile" value={profile} />
      <button type="submit" className="flex flex-1">
        <Trash2 size={20} className="mr-2 text-red-800" />
        <span className="text-red-800">Excluir</span>
      </button>
    </form>
  )
}
