import { CardContent } from '@/components/ui/card'
import { ReactNode } from 'react'

export default function ContentHome({ children }: { children: ReactNode }) {
  return (
    <CardContent className="mt-8 grid grid-cols-2 gap-2 rounded-md bg-zinc-300 p-5 md:grid-cols-4">
      {children}
    </CardContent>
  )
}
