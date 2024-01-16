import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'

import { Menu, UserCircle } from 'lucide-react'
import Link from 'next/link'
import SignOutForm from '@/components/auth/sign-out-form'

export default function InstructorNavbar({ name }: { name: string }) {
  return (
    <div className="fixed left-0 top-0 flex h-16 w-full flex-wrap items-center justify-between bg-zinc-950/40 p-2 shadow-md">
      <p className="font-semibold text-slate-100 lg:hidden">{name}</p>
      <div className="flex gap-2 text-slate-100">
        <Link href="/instrutor" className="hidden lg:flex">
          Inicio
        </Link>
        <div className="border-r-2 opacity-30" />
        <Link href="/instrutor/turmas" className="hidden lg:flex">
          Turmas
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className="gap-2">
            <UserCircle className="hidden lg:flex" />{' '}
            <Menu className="lg:hidden" />{' '}
            <p className="hidden lg:flex">{name}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">
            Instrutor
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="lg:hidden" />
          <DropdownMenuGroup className="lg:hidden">
            <DropdownMenuItem>
              <Link href="/instrutor" className="w-full p-1">
                Inicio
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/instrutor/turmas" className="w-full p-1">
                Turmas
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem>
            <SignOutForm />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
