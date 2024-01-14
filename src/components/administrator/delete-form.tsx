'use client'

import { Trash2 } from 'lucide-react'
import * as actions from '@/actions/admin-actions'
import { toast } from 'sonner'
import { UserType } from '@/lib/types'

interface DeleteFormProps {
  id: string
  profile: UserType
}

export default function DeleteForm({ id, profile }: DeleteFormProps) {
  async function handleSubmit(formData: FormData) {
    const id = formData.get('id') as string
    const profile = formData.get('profile') as UserType

    profile === 'student' &&
      toast.promise(actions.deleteStudent(id), {
        loading: 'Aguarde...',
        success: (data) => data.message,
        error: 'Não foi possível fazer a exclusão do estudante',
      })

    profile === 'instructor' &&
      toast.promise(actions.deleteInstructor(id), {
        loading: 'Aguarde...',
        success: (data) => data.message,
        error: 'Não foi possível fazer a exclusão do estudante',
      })

    profile === 'parent' && toast.info('Implementar')
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
