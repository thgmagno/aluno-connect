'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, RefreshCcw, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { CategoryType } from '@/lib/types'
import { mutation } from '@/db/mutation'
import { toast } from 'sonner'

interface Props {
  id: string
  category: CategoryType
}

export function DropdownMenuAdmin({ id, category }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger title="Outras opções">
        <MoreHorizontal className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 font-medium">
        {category !== 'classroom' && (
          <DropdownMenuItem
            className={`cursor-pointer ${buttonVariants({
              variant: 'outline',
            })}`}
            onClick={() =>
              toast.promise(
                mutation.resetUserPasswordByIdAndProfile(id, category),
                {
                  loading: 'Aguarde...',
                  success: 'Senha resetada com sucesso',
                  error: 'Ops! Não foi possível resetar a senha',
                },
              )
            }
          >
            <RefreshCcw className="mr-2 h-5 w-5" /> Resetar senha
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className={`cursor-pointer ${buttonVariants({
            variant: 'destructive',
          })}`}
          onClick={() =>
            toast.promise(mutation.deleteEntityByIdAndCategory(id, category), {
              loading: 'Aguarde...',
              success: 'Registro deletado com sucesso',
              error: 'Ops! Não foi possível deletar o registro',
            })
          }
        >
          <Trash2 className="mr-2 h-5 w-5" /> Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
