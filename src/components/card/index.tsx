'use client'

import { Classroom, Frequency, PartialUser } from '@/lib/types'
import {
  BookMarked,
  Check,
  Edit,
  GraduationCap,
  MessageSquareWarning,
  RefreshCcw,
  Trash2,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import PromiseNotification from '../common/notification'
import { Tooltip } from '@nextui-org/react'
import { actions } from '@/actions'

interface EditRecordButtonProps {
  user?: PartialUser
  classroom?: Classroom
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 flex flex-col rounded-lg border-2 border-neutral-900/60 bg-gradient-to-b from-neutral-300 to-neutral-200 p-2.5 shadow-md sm:flex-row sm:justify-between">
      {children}
    </div>
  )
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

export function CardActions({
  children,
  reverse,
}: {
  children: ReactNode
  reverse?: boolean
}) {
  return (
    <div
      className={`mt-4 flex flex-col gap-2 sm:mt-0 sm:items-start ${reverse ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
    >
      {children}
    </div>
  )
}

export function EditRecordButton({ user, classroom }: EditRecordButtonProps) {
  if (user) {
    return (
      <Tooltip content="Editar">
        <Link
          href={{
            query: {
              modal: 'editar',
              usuario: JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
              }),
            },
          }}
          className={`flex items-center justify-center rounded-lg bg-neutral-900 p-2 px-4 text-neutral-300 hover:bg-opacity-85 sm:flex-col`}
        >
          <Edit size={20} strokeWidth={2.5} className="mr-2 sm:mr-0" />
          <span className="sm:hidden">Editar</span>
        </Link>
      </Tooltip>
    )
  }
  if (classroom) {
    return (
      <Tooltip content="Editar">
        <Link
          href={{
            query: {
              modal: 'editar',
              turma: JSON.stringify({
                id: classroom.id,
                course_name: classroom.course_name,
              }),
            },
          }}
          className={`flex items-center justify-center rounded-lg bg-neutral-900 p-2 px-4 text-neutral-300 hover:bg-opacity-85 sm:flex-col`}
        >
          <Edit size={20} strokeWidth={2.5} className="mr-2 sm:mr-0" />
          <span className="sm:hidden">Editar</span>
        </Link>
      </Tooltip>
    )
  }
}

export function DeleteUserButton({ id }: { id: number }) {
  return (
    <Tooltip content="Excluir">
      <button
        onClick={() =>
          PromiseNotification({
            action: actions.administrator.deleteUser(id),
            error: 'Não foi possível deletar o usuário',
            success: 'Usuário deletado com sucesso',
          })
        }
        className={`flex items-center justify-center rounded-lg bg-neutral-900 p-2 px-4 text-red-500 hover:bg-opacity-85 sm:flex-col`}
      >
        <Trash2 size={20} strokeWidth={2.5} className="mr-2 sm:mr-0" />
        <span className="sm:hidden">Excluir</span>
      </button>
    </Tooltip>
  )
}

export function DeleteClassroomButton({ id }: { id: number }) {
  return (
    <Tooltip content="Excluir">
      <button
        onClick={() =>
          PromiseNotification({
            action: actions.administrator.deleteClassroom(id),
            error: 'Não possível excluir a turma',
            success: 'Turma excluída com sucesso',
          })
        }
        className={`flex items-center justify-center rounded-lg bg-neutral-900 p-2 px-4 text-red-500 hover:bg-opacity-85 sm:flex-col`}
      >
        <Trash2 size={20} />
        <span className="sm:hidden">Excluir</span>
      </button>
    </Tooltip>
  )
}

export function LinkStudentsClassroomButton({ id }: { id: number }) {
  return (
    <Tooltip content="Vincular aluno">
      <Link
        href={{ query: { id: `${id}`, vincular: 'alunos' } }}
        className={`flex items-center justify-center rounded-lg bg-indigo-900 p-2 px-4 text-neutral-100 hover:bg-opacity-85 sm:flex-col`}
      >
        <GraduationCap size={20} className="mr-2 sm:mr-0" />
        <span className="sm:hidden">Vincular aluno</span>
      </Link>
    </Tooltip>
  )
}

export function LinkInstructorsClassroomButton({ id }: { id: number }) {
  return (
    <Tooltip content="Vincular instrutor">
      <Link
        href={{ query: { id: `${id}`, vincular: 'instrutores' } }}
        className={`flex items-center justify-center rounded-lg bg-emerald-900 p-2 px-4 text-neutral-100 hover:bg-opacity-85 sm:flex-col`}
      >
        <BookMarked size={20} className="mr-2 sm:mr-0" />
        <span className="sm:hidden">Vincular instrutor</span>
      </Link>
    </Tooltip>
  )
}

export function LinkStudentsParentButton({ parentId }: { parentId: number }) {
  return (
    <Tooltip content="Vincular aluno">
      <Link
        href={{ query: { id: `${parentId}`, vincular: 'alunos' } }}
        className={`flex items-center justify-center rounded-lg bg-indigo-900 p-2 px-4 text-neutral-100 hover:bg-opacity-85 sm:flex-col`}
      >
        <GraduationCap size={20} className="mr-2 sm:mr-0" />
        <span className="sm:hidden">Vincular aluno</span>
      </Link>
    </Tooltip>
  )
}

export function ResetPasswordButton({ id }: { id: number }) {
  return (
    <Tooltip content="Resetar senha">
      <button
        onClick={() =>
          PromiseNotification({
            action: actions.administrator.resetPassword(id),
            error: 'Não foi possível resetar a senha',
            success: 'Senha resetada com sucesso',
          })
        }
        className={`flex items-center justify-center rounded-lg bg-neutral-900 p-2 px-4 text-amber-500 hover:bg-opacity-85 sm:flex-col`}
      >
        <RefreshCcw size={20} strokeWidth={2.5} className="mr-2 sm:mr-0" />
        <span className="sm:hidden">Resetar senha</span>
      </button>
    </Tooltip>
  )
}

export function AcceptRequest({ id }: { id: number }) {
  return (
    <Tooltip content="Aceitar">
      <button
        onClick={async () =>
          PromiseNotification({
            action: actions.administrator.acceptRequest(id),
            error: 'Não foi possível gravar a solicitação',
            success: 'Alterações gravadas com sucesso',
          })
        }
        className={`flex items-center justify-center rounded-lg bg-emerald-900 p-2 px-4 text-white hover:bg-opacity-85 sm:flex-col`}
      >
        <Check size={20} strokeWidth={3} />
        <span className="sm:hidden">Aceitar</span>
      </button>
    </Tooltip>
  )
}

export function RejectRequest({ id }: { id: number }) {
  return (
    <Tooltip content="Rejeitar">
      <button
        onClick={async () =>
          PromiseNotification({
            action: actions.administrator.rejectRequest(id),
            error: 'Não foi possível gravar a solicitação',
            success: 'Alterações gravadas com sucesso',
          })
        }
        className={`flex items-center justify-center rounded-lg bg-orange-800 p-2 px-4 text-white hover:bg-opacity-85 sm:flex-col`}
      >
        <X size={20} strokeWidth={3} />
        <span className="sm:hidden">Rejeitar</span>
      </button>
    </Tooltip>
  )
}

export function JustifyAbsense({ frequency }: { frequency: Frequency }) {
  return (
    <Tooltip content="Justificar">
      <Link
        href={{
          query: {
            aluno: `${frequency.student_id}`,
            modal: 'justificar',
            dados: JSON.stringify(frequency),
          },
        }}
        className={`flex items-center justify-center rounded bg-amber-300 p-2 px-4 hover:bg-opacity-85 sm:flex-col`}
      >
        <MessageSquareWarning size={20} className="mr-2 sm:mr-0" />
        <span className="sm:hidden">Justificar</span>
      </Link>
    </Tooltip>
  )
}
