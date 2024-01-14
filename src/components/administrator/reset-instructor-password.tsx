'use client'

import * as actions from '@/actions/admin-actions'
import { RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ResetInstructorPassword({ id }: { id: string }) {
  async function handleSubmit(formData: FormData) {
    const id = formData.get('id') as string

    toast.promise(actions.resetInstructorPassword(id), {
      loading: 'Aguarde...',
      success: () => <b>Senha resetada com sucesso!</b>,
      error: () => <b>Não foi possível resetar a senha</b>,
    })
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="flex flex-1">
        <RotateCcw size={20} className="mr-2" /> Resetar senha
      </button>
    </form>
  )
}
