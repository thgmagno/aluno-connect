'use client'

import {
  Classroom,
  Frequency,
  FrequencyGrouped,
  PartialUser,
  Request,
} from '@/lib/types'
import React from 'react'
import {
  AcceptRequest,
  Card,
  CardActions,
  CardContent,
  DeleteClassroomButton,
  DeleteUserButton,
  EditRecordButton,
  JustifyAbsense,
  ResetPasswordButton,
  RejectRequest,
  LinkStudentsClassroomButton,
  LinkInstructorsClassroomButton,
  LinkStudentsParentButton,
  ShowFrequency,
  SetCategory,
} from '@/components/card'
import { FormatDate } from '@/utils/format-date'
import { FrequencyStatus } from './frequency-status'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { userStore } from '@/store/user'
import { CheckAgeStudent } from '@/utils/check-age-student'
import { ArrowRightCircle, Presentation } from 'lucide-react'

interface Props {
  user?: PartialUser[]
  classroom?: Classroom[]
  request?: Request[]
  frequency?: Frequency[]
  frequencyGrouped?: FrequencyGrouped[]
  createFrequency?: PartialUser[]
}

export default function RenderList({
  user,
  classroom,
  request,
  frequency,
  frequencyGrouped,
  createFrequency,
}: Props) {
  const pathname = usePathname()
  const studentId = useSearchParams().get('aluno')
  const { user: userLogged } = userStore()

  const isStudent = userLogged?.profile === 'STUDENT'
  const isParent = userLogged?.profile === 'PARENT'
  const isInstructor = userLogged?.profile === 'INSTRUCTOR'
  const isAdministrator = userLogged?.profile === 'ADMINISTRATOR'

  if (user?.length) {
    return (
      <React.Fragment>
        {user.map((user) => (
          <Card key={user.id}>
            <CardContent>
              <b>Nome: {user.name}</b>
              <p>E-mail: {user.email}</p>
              {user.birthdate && (
                <p>Data de nascimento: {FormatDate(user.birthdate)}</p>
              )}
            </CardContent>
            <CardActions>
              {/* Parent Options */}
              {isParent && (
                <>
                  <Link
                    href={{
                      pathname: '/aluno/turmas',
                      query: { aluno: String(user.id) },
                    }}
                    className={`flex items-center justify-center rounded border-2 bg-neutral-200 p-2 px-4 shadow hover:bg-opacity-85`}
                  >
                    <span>Turmas</span>
                    <Presentation className="ml-2" />
                  </Link>
                </>
              )}

              {/* Admin Options */}
              {isAdministrator && (
                <>
                  {pathname.includes('responsaveis') && (
                    <LinkStudentsParentButton parentId={user.id} />
                  )}
                  <EditRecordButton user={user} />
                  <ResetPasswordButton id={user.id} />
                  <DeleteUserButton id={user.id} />
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </React.Fragment>
    )
  }

  if (classroom?.length) {
    return (
      <React.Fragment>
        {classroom.map((classroom) => (
          <Card key={classroom.id}>
            <CardContent>
              <b>Turma: {classroom.course_name}</b>
            </CardContent>
            <CardActions>
              {isStudent && (
                <ShowFrequency pathname={`/minhas-turmas/${classroom.id}`} />
              )}
              {isParent && (
                <ShowFrequency
                  pathname={`/aluno/turmas/${classroom.id}`}
                  studentId={`${studentId}`}
                />
              )}
              {isInstructor && (
                <Link
                  href={{ pathname: `/turma/${classroom.id}` }}
                  className={`flex items-center justify-center rounded border-2 bg-neutral-200 p-2 px-4 shadow hover:bg-opacity-85`}
                >
                  <span>Visualizar turma</span>
                  <ArrowRightCircle className="ml-2" />
                </Link>
              )}
              {isAdministrator && (
                <>
                  <LinkStudentsClassroomButton id={classroom.id} />
                  <LinkInstructorsClassroomButton id={classroom.id} />
                  <EditRecordButton classroom={classroom} />
                  <DeleteClassroomButton id={classroom.id} />
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </React.Fragment>
    )
  }

  if (request?.length) {
    return (
      <React.Fragment>
        {request.map((request) => (
          <Card key={request.id}>
            <CardContent>
              <b>Aluno: {request.student_name}</b>
              <p>Turma: {request.course_name}</p>
              <p>Data: {FormatDate(request.frequency.date)}</p>
              <p>
                Situação: <FrequencyStatus status={request.frequency.status} />
              </p>
              <p>Justificativa do aluno: {request.justification}</p>
              <p>Categoria: {request.category ?? 'pendente'}</p>
              <p>
                Anexo: <span className="text-red-500">implementar</span>
              </p>
            </CardContent>
            {request.frequency.status === 'PENDING' && (
              <CardActions reverse>
                <AcceptRequest id={request.id} />
                <RejectRequest id={request.id} />
              </CardActions>
            )}
            {(request.frequency.status === 'APPROVED' ||
              request.frequency.status === 'REJECTED') && (
              <CardActions>
                <SetCategory id={request.id} />
              </CardActions>
            )}
          </Card>
        ))}
      </React.Fragment>
    )
  }

  if (frequency?.length) {
    const isAdult = CheckAgeStudent(userLogged?.birthdate)

    return (
      <React.Fragment>
        {frequency.map((freq) => (
          <Card key={freq.id}>
            <CardContent>
              <b>Data: {FormatDate(freq.date)}</b>
              <p>Turma: {freq.classroom_name}</p>
              <p>
                Situação: <FrequencyStatus status={freq.status} />
              </p>
            </CardContent>
            {isStudent && freq.status === 'ABSENT' && isAdult && (
              <CardActions reverse>
                <JustifyAbsense frequency={freq} />
              </CardActions>
            )}
            {isParent && freq.status === 'ABSENT' && (
              <CardActions reverse>
                <JustifyAbsense frequency={freq} />
              </CardActions>
            )}
          </Card>
        ))}
      </React.Fragment>
    )
  }

  if (frequencyGrouped?.length) {
    return (
      <React.Fragment>
        {frequencyGrouped.map((freq) => (
          <div
            key={freq.date}
            className="mx-auto mb-5 max-w-lg rounded-lg border-2 border-neutral-600 bg-neutral-900/75 p-2 text-neutral-200 shadow"
          >
            <h1 className="mb-3 text-center text-lg font-medium text-foreground-300">
              {freq.date}
            </h1>
            {freq.students.map((student, index) => (
              <div key={index}>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-600 pb-1">
                  <span className="max-w-80 truncate">{student.name}</span>
                  <span>
                    <FrequencyStatus status={student.status} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </React.Fragment>
    )
  }

  if (createFrequency?.length) {
    return (
      <React.Fragment>
        {createFrequency.map((student) => (
          <div
            key={student.id}
            className="mb-3 flex justify-between border-b-2 pb-2"
          >
            <p>{student.name}</p>
            <input
              type="checkbox"
              name={'student'}
              value={student.id}
              className="w-6"
            />
          </div>
        ))}
      </React.Fragment>
    )
  }

  return (
    <p className="p-10 text-center text-lg text-neutral-500 md:text-xl">
      Não há registros disponíveis no momento
    </p>
  )
}
