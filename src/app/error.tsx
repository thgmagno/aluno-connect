'use client'

import { AlertCircle } from 'lucide-react'

export default function Error() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-t from-indigo-950 to-neutral-900">
      <h1 className="flex max-w-lg text-center text-xl font-medium text-primary-foreground">
        <AlertCircle className="mr-2" size={40} />
        Não foi possível estabelecer uma conexão segura com o servidor
      </h1>
    </div>
  )
}
