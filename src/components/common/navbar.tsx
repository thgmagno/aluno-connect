'use client'

import { PartialUser } from '@/lib/types'
import { userStore } from '@/store/user'
import React, { useEffect } from 'react'
import Link, { LinkProps } from 'next/link'
import { ChevronLeft, LogOut, Menu, X } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { actions } from '@/actions'
import { Paths } from '@/lib/paths'

interface GoBackProps {
  href: LinkProps['href']
  as?: LinkProps['as']
}

export function Navbar({ user }: { user: PartialUser }) {
  const { setUser } = userStore()

  useEffect(() => {
    setUser(user)
  }, [])

  return (
    <>
      <NavbarMobile user={user} />
      <NavbarDesktop user={user} />
    </>
  )
}

function NavbarMobile({ user }: { user: PartialUser }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const menu = searchParams.get('menu')

  return (
    <nav className="bg-neutral-900/50 p-2 py-5 font-medium text-neutral-300 shadow-md md:hidden">
      {menu !== 'aberto' && (
        <Link href={{ query: { menu: 'aberto' } }}>
          <Menu className="ml-auto mr-5" />
        </Link>
      )}

      <nav
        className={`${menu === 'aberto' ? 'absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center space-y-5 bg-neutral-900/95' : 'hidden'}`}
      >
        <Link href={pathname}>
          <X className="absolute right-6 top-5" />
        </Link>
        <Link
          href="/"
          className={`transition-all duration-500 ${pathname === '/' ? 'border-b-2 border-neutral-400' : 'border-b-transparent'}`}
        >
          Início
        </Link>
        {Paths[user.profile].map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`transition-all duration-500 ${pathname.includes(item.href) ? 'border-b-2 border-neutral-400' : 'border-b-transparent'}`}
          >
            {item.name}
          </Link>
        ))}
        <button className="text-danger" onClick={() => actions.auth.logout()}>
          Finalizar sessão
        </button>
      </nav>
    </nav>
  )
}

function NavbarDesktop({ user }: { user: PartialUser }) {
  const pathname = usePathname()

  return (
    <nav className="hidden justify-between bg-neutral-900/50 p-2 py-5 font-medium text-neutral-300 shadow-md md:flex">
      <ul className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={`transition-all duration-500 ${pathname === '/' ? 'border-b-2 border-neutral-400' : 'border-b-transparent'}`}
        >
          Início
        </Link>
        {Paths[user.profile].map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`transition-all duration-500 ${pathname === item.href ? 'border-b-2 border-neutral-400' : 'border-b-transparent'}`}
          >
            {item.name}
          </Link>
        ))}
      </ul>

      <button
        onClick={() => actions.auth.logout()}
        className="flex items-center gap-2"
      >
        Sair
        <LogOut size={20} />
      </button>
    </nav>
  )
}

export function GoBack({ href, as }: GoBackProps) {
  return (
    <Link
      href={href}
      as={as}
      className="flex max-w-32 items-center px-2 py-5 text-neutral-200"
    >
      <ChevronLeft className="mr-1 h-6 w-6" /> Voltar
    </Link>
  )
}
