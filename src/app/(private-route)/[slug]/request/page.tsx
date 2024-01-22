import getAll from '@/actions/read/getAll'
import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AuthService from '@/services/auth-service'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import React from 'react'
import Forms from '@/components/forms'

// student, parent
export default async function RequestPage() {
  const requests = await getAll.Requests()
  const profile = await AuthService.getUserProfile()

  const isAdmin = profile === 'administrator'
  const isStudent = profile === 'student'

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Histórico de solicitações</h1>
      {requests?.length ? (
        <Table className="mx-auto">
          <TableCaption>Histórico de solicitações</TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {!isStudent && <TableHead>Aluno</TableHead>}
              <TableHead>Data</TableHead>
              <TableHead>Justificativa</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead>Categoria</TableHead>
              {isAdmin && <TableHead>Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-neutral-950/40">
            {requests.map((req) => (
              <TableRow key={req.id} className="text-white hover:text-black">
                {!isStudent && (
                  <TableCell className="max-w-[200px] truncate font-medium">
                    {req.studentID.name}
                  </TableCell>
                )}
                <TableCell>
                  {req.frequencyID.date.toLocaleDateString('pt-br')}
                </TableCell>
                <TableCell
                  className="max-w-[220px] truncate"
                  title={req.justification}
                >
                  {req.justification}
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <FrequencyStatusBadge status={req.frequencyID.status} />
                </TableCell>
                {isAdmin && <TableCell>Problemas Técnicos</TableCell>}
                {isAdmin && (
                  <TableCell>
                    {req.frequencyID.status === 'PENDING' ? (
                      <Forms.update.approvalRequest
                        frequencyId={req.frequencyID.id}
                      />
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button>Categorizar</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuGroup className="overflow-y-auto">
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Assuntos Pessoais"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Compromissos Médicos"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Eventos Religiosos"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Estágios ou Trabalho"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Problemas de Saúde"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Problemas de Transporte"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Problemas Financeiros"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Questões Familiares"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forms.update.setCategoryToRequest
                                category="Outros Assuntos"
                                requestId={req.id}
                              />
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhuma requisição em aberto
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
