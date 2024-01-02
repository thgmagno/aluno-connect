import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function AdmHome() {
  return (
    <CardContent>
      <Link href="novo-usuario">
        <Button variant={'outline'}>Adicionar novo usuário</Button>
      </Link>
    </CardContent>
  )
}
