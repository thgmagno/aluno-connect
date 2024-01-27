'use server'

import prisma from '@/lib/prisma'
import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import JustifyAbsense from '../forms/justify-absense'

export default async function StudentFrequencyList({ id }: { id: string }) {
  const frequency = await prisma.frequency.findMany({
    where: { studentId: id },
    orderBy: { date: 'desc' },
    include: { classID: true, studentID: true },
  })

  const renderedFrequency = frequency.map((freq) => {
    return (
      <div
        key={freq.id}
        className={`my-2 flex items-center justify-between rounded p-2 ${
          freq.status === 'ABSENT'
            ? 'border-2 border-red-500 bg-red-200'
            : 'bg-zinc-400'
        }`}
      >
        <div>
          <b className="flex items-center gap-2">
            {freq.date.toLocaleDateString('pt-br')}
            <FrequencyStatusBadge status={freq.status} />
          </b>
          <p>{freq.classID.course_name}</p>
        </div>
        {freq.status === 'ABSENT' && (
          <Dialog>
            <DialogTrigger className={buttonVariants()}>
              Justificar
            </DialogTrigger>
            <DialogContent>
              <JustifyAbsense
                frequencyId={freq.id}
                studentId={freq.studentID.id}
                frequencyDate={freq.date}
                studentName={freq.studentID.name}
                courseName={freq.classID.course_name}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  })

  return <div>{renderedFrequency}</div>
}
