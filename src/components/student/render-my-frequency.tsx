import { formatDate } from '@/lib/utils'
import type { Frequency } from '@prisma/client'
import { Check, X } from 'lucide-react'
import * as Table from '@/components/common/table'

export default function RenderStudentFrequency({
  frequency,
}: {
  frequency: Frequency[]
}) {
  return (
    <Table.Content>
      <Table.Header>
        <Table.Cell>Data</Table.Cell>
        <Table.Cell>Situação</Table.Cell>
        <Table.Cell>Ações</Table.Cell>
      </Table.Header>
      <Table.Body>
        {frequency.map((freq) => (
          <Table.Row key={freq.id}>
            <Table.Cell>{formatDate(freq.date)}</Table.Cell>
            <Table.Cell>
              <p className="flex w-full justify-center">
                {freq.status ? (
                  <Check
                    strokeWidth={5}
                    className="rounded bg-green-600 p-1 text-slate-100"
                  />
                ) : (
                  <X
                    strokeWidth={5}
                    className="rounded bg-red-600 p-1 text-slate-100"
                  />
                )}
              </p>
            </Table.Cell>
            <Table.Cell>[implementar]</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  )
}
