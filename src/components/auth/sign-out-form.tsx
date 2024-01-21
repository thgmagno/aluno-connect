import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { cookies } from 'next/headers'
import { LogOut } from 'lucide-react'
import React from 'react'

export default function SignOutForm() {
  async function logout() {
    'use server'
    cookies().delete('session-aluno-connect')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center justify-center">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Finalizar sessão?</AlertDialogTitle>
          <AlertDialogDescription>
            Lembre-se, alterações não salvas serão perdidas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form action={logout}>
            <Button type="submit" variant={'destructive'} className="w-full">
              Confirmar
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
