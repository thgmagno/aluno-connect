import FrequencyStatusBadge from '@/components/common/frequency-status-badge'
import { JustifyAbsense } from '@/components/student'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { queries } from '@/db/queries'
import AuthService from '@/services/auth-service'
import { cookies } from 'next/headers'
import React from 'react'

export default async function StudentFrequencyPage() {
  const token = cookies().get('session-aluno-connect')
  if (!token) return
  const { sub } = await AuthService.openSessionToken(token.value)

  const frequencyList = await queries.frequency.findFrequencyByStudentId(
    sub as string,
  )

  const renderedFrequency = frequencyList.map((freq) => {
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

  // TODO: Create variable to armazene student age.

  return (
    <React.Fragment>
      <h1 className="text-lg font-medium text-muted-foreground">
        Lista de frequência
      </h1>
      {frequencyList.length ? (
        <div>{renderedFrequency}</div>
      ) : (
        <p>Não há registros</p>
      )}
    </React.Fragment>
  )
}
