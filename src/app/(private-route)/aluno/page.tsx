import prisma from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import AuthService from '@/services/auth-service'
import { Check, X } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function StudentHome() {
  const token = cookies().get('session-aluno-connect')
  if (!token) redirect('/entrar')
  const { sub } = await AuthService.openSessionToken(token.value)
  if (!sub) cookies().delete('session-aluno-connect')

  const frequency = await prisma.frequency.findMany({
    where: { studentId: sub },
  })

  const renderedFrequency = frequency.map((freq) => {
    return (
      <div key={freq.id} className="grid grid-cols-2">
        <p className="flex w-full justify-center">{formatDate(freq.date)}</p>
        <p className="flex w-full justify-center">
          {freq.status ? (
            <Check
              strokeWidth={5}
              className="rounded bg-green-600 p-1 text-slate-100"
            />
          ) : (
            <X
              strokeWidth={5}
              className="rounded bg-red-600 p-1 text-slate-100"
            />
          )}
        </p>
      </div>
    )
  })

  return (
    <div className="relative top-24 flex flex-col gap-2">
      {renderedFrequency.length > 0 ? (
        <div className="flex flex-col space-y-2 rounded bg-stone-200 p-2">
          <div className="grid grid-cols-2 font-semibold">
            <p className="flex w-full justify-center">Data</p>
            <p className="flex w-full justify-center">Situação</p>
          </div>
          {renderedFrequency}
        </div>
      ) : (
        <p className="text-center text-stone-500">
          Nenhuma presença registrada para você neste momento.
        </p>
      )}
    </div>
  )
}
