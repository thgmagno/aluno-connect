import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface Props {
  name: string
  email: string
  birthdate: Date
}

export function DialogUpdateStudent({ name, email, birthdate }: Props) {
  return (
    <Dialog>
      <DialogTrigger title="Editar">
        <Edit className="mr-2 h-5 w-5" />
      </DialogTrigger>
      <DialogContent>
        <form action="" className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input name="name" type="text" defaultValue={name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" defaultValue={email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Data de aniversário</Label>
            <Input
              name="birthdate"
              type="date"
              defaultValue={birthdate.toISOString().slice(0, 10)}
            />
          </div>

          <DialogFooter>
            <Button>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
