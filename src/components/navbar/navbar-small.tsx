'use client'

import React from 'react'
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
import { Menu } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface Props {
  options: {
    href: string
    name: string
  }[]
  logout: () => void
}

export default function NavbarSmall({ options, logout }: Props) {
  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 flex w-48 flex-col">
          {options.map((op) => (
            <Link
              key={op.href}
              href={op.href}
              className="rounded p-2 hover:bg-neutral-200"
            >
              {op.name}
            </Link>
          ))}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="rounded p-2 text-left font-medium hover:bg-neutral-200 hover:text-red-500">
                Finalizar sessão
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Finalizar sessão?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form action={logout}>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full"
                  >
                    Confirmar
                  </Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  )
}
