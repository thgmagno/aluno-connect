import { Button } from '@/components/ui/button'
import BtnGoBack from './btn-go-back'
import Link from 'next/link'

export default function NavigationBar({
  goBack,
  register,
}: {
  goBack: string
  register?: string
}) {
  return (
    <nav className="flex w-full items-center justify-between p-4 md:p-8">
      <BtnGoBack href={goBack} />
      {register && (
        <Link
          href={register}
          className="col-span-2 font-semibold text-muted md:mt-0"
        >
          <Button variant={'secondary'}>Cadastrar</Button>
        </Link>
      )}
    </nav>
  )
}
