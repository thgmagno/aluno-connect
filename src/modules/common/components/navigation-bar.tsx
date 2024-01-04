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
    <nav className="mb-5 flex h-16 w-full items-center justify-between px-4 md:mb-0 md:px-8">
      <BtnGoBack href={goBack} />
      {register && (
        <Link
          href={register}
          className="col-span-2 font-semibold text-muted md:mt-0"
        >
          <Button variant={'secondary'} size={'sm'}>
            Cadastrar
          </Button>
        </Link>
      )}
    </nav>
  )
}
