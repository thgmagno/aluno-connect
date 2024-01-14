'use client'

import * as actions from '@/actions/admin-actions'
import { UserType } from '@/lib/types'
import { RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

interface ResetPasswordProps {
  id: string
  profile: UserType
}

export default function ResetPassword({ id, profile }: ResetPasswordProps) {
  async function handleSubmit(formData: FormData) {
    const id = formData.get('id') as string
    const profile = formData.get('profile') as UserType

    profile === 'student' &&
      toast.promise(actions.resetPassword({ id, profile: 'student' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível resetar a senha',
      })

    profile === 'instructor' &&
      toast.promise(actions.resetPassword({ id, profile: 'instructor' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível resetar a senha',
      })

    profile === 'parent' &&
      toast.promise(actions.resetPassword({ id, profile: 'parent' }), {
        loading: 'Aguarde...',
        success: (data) => data?.message,
        error: 'Não foi possível resetar a senha',
      })
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="profile" value={profile} />
      <button type="submit" className="flex flex-1">
        <RotateCcw size={20} className="mr-2" /> Resetar senha
      </button>
    </form>
  )
}
