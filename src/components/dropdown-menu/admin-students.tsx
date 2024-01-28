import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, RefreshCcw, Trash2 } from 'lucide-react'
import { buttonVariants } from '../ui/button'

export default function DropdownMenuAdminStudents() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger title="Outras opções">
        <MoreHorizontal className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 font-medium">
        <DropdownMenuItem className={buttonVariants({ variant: 'outline' })}>
          <RefreshCcw className="mr-2 h-5 w-5" /> Resetar senha
        </DropdownMenuItem>
        <DropdownMenuItem
          className={buttonVariants({ variant: 'destructive' })}
        >
          <Trash2 className="mr-2 h-5 w-5" /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
