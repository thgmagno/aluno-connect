import { Button } from '@nextui-org/button'
import Link from 'next/link'

interface Props {
  pathname: string
  query: {
    modal: string
  }
}

export default function ButtonCreateRegister({ pathname, query }: Props) {
  return (
    <div className="flex justify-end px-2">
      <Link href={{ pathname, query }}>
        <Button color="primary">Cadastrar</Button>
      </Link>
    </div>
  )
}
