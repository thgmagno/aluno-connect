import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function StudentFrequencyPage() {
  const frequency = [
    { id: '1', date: new Date(), status: true },
    { id: '2', date: new Date(), status: true },
    { id: '3', date: new Date(), status: false },
    { id: '4', date: new Date(), status: true },
    { id: '5', date: new Date(), status: true },
    { id: '6', date: new Date(), status: false },
  ]

  // TODO: Create variable to armazene student age.

  return (
    <div>
      <h1>Lista de frequência do Aluno</h1>
      {frequency ? (
        <Table>
          <TableHeader>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ação</TableHead>
          </TableHeader>
          <TableBody>
            {frequency.map((freq) => (
              <TableRow key={freq.id}>
                <TableCell>{freq.date.toLocaleDateString('pt-br')}</TableCell>
                <TableCell>{freq.status ? 'Presente' : 'Faltou'}</TableCell>
                <TableCell>
                  {!freq.status && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Justificar</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Justificar a falta</DialogTitle>
                          <DialogDescription>
                            Envie uma justificativa para compreendermos melhor a
                            situação.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Justificativa:
                            </Label>
                            <Input id="justification" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Enviar para análise</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Não existe nenhum registro de frequência.</p>
      )}
    </div>
  )
}
