import AuthService from '@/modules/auth/services/auth-service'
import { BookMarked, ShieldCheck, User, UserCheck2 } from 'lucide-react'
import { cookies } from 'next/headers'
import BtnLogout from './btn-logout'
import Link from 'next/link'

export default async function UserAvatar() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return

  const { name, profile } = await AuthService.openSessionToken(token.value)
  const icon =
    profile === 'instrutor' ? (
      <BookMarked className="rounded-full bg-zinc-300 p-1" size={32} />
    ) : profile === 'student' ? (
      <User className="rounded-full bg-zinc-300 p-1" size={32} />
    ) : profile === 'parent' ? (
      <UserCheck2 className="rounded-full bg-zinc-300 p-1" size={32} />
    ) : (
      <ShieldCheck className="rounded-full bg-zinc-300 p-1" size={32} />
    )

  return (
    <div className="top-0 z-10 flex w-full justify-between bg-neutral-950 p-3 shadow-md md:px-6">
      <Link href="/" className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-zinc-300">{name as string}</span>
      </Link>
      <BtnLogout />
    </div>
  )
}
