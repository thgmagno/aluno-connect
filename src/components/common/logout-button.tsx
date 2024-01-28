import { LogOut } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'
import { cookies } from 'next/headers'

export default function LogoutButton() {
  const endSession = async () => {
    'use server'

    cookies().delete('session-aluno-connect')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex gap-2 text-white hover:text-red-600">
          <LogOut className="h-6 w-6" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Finalizar sessão?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form action={endSession}>
            <Button type="submit" variant="destructive" className="w-full">
              Finalizar
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
