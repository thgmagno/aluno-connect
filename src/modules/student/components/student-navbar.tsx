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
import SignOutForm from '@/modules/auth/components/sign-out-form'

import { Menu, UserCircle } from 'lucide-react'
import Link from 'next/link'

export default function StudentNavbar({
  name,
  profile,
}: {
  name: string
  profile: string
}) {
  return (
    <div className="absolute left-0 top-0 flex h-16 w-full flex-wrap items-center justify-between bg-teal-950 p-2">
      <p className="font-semibold text-slate-100 lg:hidden">{name}</p>
      <div className="flex gap-2 text-slate-100">
        <Link href="/" className="hidden lg:flex">
          Inicio
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
            {profile}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="lg:hidden" />
          <DropdownMenuGroup className="lg:hidden">
            <DropdownMenuItem>
              <Link href="/" className="w-full p-1">
                Inicio
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
