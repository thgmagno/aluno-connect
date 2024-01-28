import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const montserrat = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

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
        className={`${montserrat.className} scrollbar-thin scrollbar-track-indigo-950 scrollbar-thumb-neutral-900`}
      >
        {children}
      </body>
    </html>
  )
}
