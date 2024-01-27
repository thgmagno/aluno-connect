import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
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
    { id: '1', date: new Date(2023, 1, 10), status: true },
    { id: '2', date: new Date(2023, 1, 11), status: true },
    { id: '3', date: new Date(2023, 1, 12), status: false },
    { id: '4', date: new Date(2023, 1, 13), status: true },
    { id: '5', date: new Date(2023, 1, 14), status: true },
    { id: '6', date: new Date(2023, 1, 15), status: false },
  ]

  // TODO: Create variable to armazene student age.

  return (
    <>
      <h1 className="text-lg font-medium text-muted-foreground">
        Lista de frequência
      </h1>
      {frequency ? (
        <Table className="overflow-hidden rounded-lg bg-zinc-400">
          <TableHeader className="bg-zinc-950/80">
            <TableRow className="hover:bg-transparent">
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frequency.map((freq) => (
              <TableRow key={freq.id}>
                <TableCell>{freq.date.toLocaleDateString('pt-br')}</TableCell>
                <TableCell>
                  {freq.status ? (
                    <FrequencyStatusBadge status="PRESENT" />
                  ) : (
                    <FrequencyStatusBadge status="ABSENT" />
                  )}
                </TableCell>
                <TableCell>
                  {!freq.status && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">Justificar</Button>
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
                          <Button type="submit" size="sm">
                            Enviar para análise
                          </Button>
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
    </>
  )
}
