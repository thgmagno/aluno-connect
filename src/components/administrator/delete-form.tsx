'use client'

import { Trash2 } from 'lucide-react'
import * as actions from '@/actions/admin-actions'
import { toast } from 'sonner'

interface DeleteFormProps {
  id: string
  category: 'student' | 'parent' | 'instructor' | 'class'
}

export default function DeleteForm({ id, category }: DeleteFormProps) {
  async function handleSubmit(formData: FormData) {
    const id = formData.get('id') as string
    const category = formData.get('category')

    category === 'student' &&
      toast.promise(actions.removeRecord({ id, category: 'student' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível fazer a exclusão do estudante',
      })

    category === 'instructor' &&
      toast.promise(actions.removeRecord({ id, category: 'student' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível fazer a exclusão do instrutor',
      })

    category === 'parent' &&
      toast.promise(actions.removeRecord({ id, category: 'parent' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível fazer a exclusão do responsável',
      })

    category === 'class' &&
      toast.promise(actions.removeRecord({ id, category: 'class' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível fazer a exclusão da turma',
      })
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="category" value={category} />
      <button type="submit" className="flex flex-1">
        <Trash2 size={20} className="mr-2 text-red-800" />
        <span className="text-red-800">Excluir</span>
      </button>
    </form>
  )
}
