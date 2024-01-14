'use client'

import { Trash2 } from 'lucide-react'
import * as actions from '@/actions/admin-actions'
import { toast } from 'sonner'

export default function DeleteInstructorForm({ id }: { id: string }) {
  async function handleSubmit(formData: FormData) {
    const id = formData.get('id') as string

    toast.promise(actions.deleteInstructor(id), {
      loading: 'Aguarde...',
      success: (data) => data.message,
      error: 'Não foi possível fazer a exclusão do instrutor',
    })
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="flex flex-1">
        <Trash2 size={20} className="mr-2 text-red-800" />
        <span className="text-red-800">Excluir</span>
      </button>
    </form>
  )
}
