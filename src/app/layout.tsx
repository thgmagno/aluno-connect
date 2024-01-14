import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aluno Connect',
  description: 'Gerenciador de frequência online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.className} scrollbar-thin scrollbar-track-teal-950 scrollbar-thumb-neutral-950`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
