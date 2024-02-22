'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/react'
import { Mail, LockKeyhole } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { useFormState } from 'react-dom'
import DisplayErrorForm from '../common/display-error-form'
import { actions } from '@/actions'
import FormSubmit from '../common/form-submit'

export function CardAuth({ children }: { children: ReactNode }) {
  return (
    <div className="w-[94%] max-w-md rounded-xl bg-white px-5 pb-10 pt-4 shadow-lg">
      {children}
    </div>
  )
}

export function CardAuthLogin() {
  const [formState, action] = useFormState(actions.auth.login, {
    errors: {},
  })

  const [visible, setVisible] = useState(false)

  return (
    <form action={action} className="flex flex-col space-y-6">
      <header className="ml-1 space-y-2">
        <h1 className="text-xl font-medium md:text-2xl">Aluno Connect</h1>
        <h2 className="text-default-foreground">Faça login para continuar</h2>
      </header>
      <Input
        name="email"
        type="email"
        placeholder="E-mail"
        endContent={<Mail />}
        variant="faded"
        isInvalid={!!formState?.errors.email}
        errorMessage={formState?.errors.email}
      />
      <Input
        name="password"
        type={`${visible ? 'text' : 'password'}`}
        placeholder="Senha"
        endContent={<LockKeyhole />}
        variant="faded"
        isInvalid={!!formState?.errors.password}
        errorMessage={formState?.errors.password}
      />
      <button
        onClick={() => setVisible(!visible)}
        type="button"
        className="relative bottom-2 self-end"
      >
        {visible ? 'ocultar senha' : 'mostrar senha'}
      </button>
      {formState.errors._form && (
        <DisplayErrorForm error={formState.errors._form} />
      )}
      <footer className="flex flex-col space-y-6">
        <FormSubmit title="Entrar" />
        <Link href="/primeiro-acesso">
          <Button className="w-full">Primeiro acesso?</Button>
        </Link>
      </footer>
    </form>
  )
}

export function CardAuthActivateEmail() {
  const [formState, action] = useFormState(actions.auth.activateEmail, {
    errors: {},
  })

  return (
    <form action={action} className="space-y-6">
      <header className="ml-1 space-y-2">
        <h1 className="text-xl font-medium md:text-2xl">Aluno Connect</h1>
        <h2 className="text-default-foreground">
          Informe o seu e-mail para continuar
        </h2>
      </header>
      <Input
        name="email"
        type="email"
        placeholder="E-mail"
        endContent={<Mail />}
        variant="faded"
        isInvalid={!!formState?.errors.email}
        errorMessage={formState?.errors.email}
      />
      {formState?.errors._form && (
        <DisplayErrorForm error={formState.errors._form} />
      )}
      <footer className="flex flex-col space-y-6">
        <FormSubmit title="Avançar" />
        <Link href="/entrar">
          <Button className="w-full">Cancelar</Button>
        </Link>
      </footer>
    </form>
  )
}

export function CardAuthSetPassword() {
  const [formState, action] = useFormState(actions.auth.setPassword, {
    errors: {},
  })

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [visible, setVisible] = useState(false)

  return (
    <form action={action} className="flex flex-col space-y-6">
      <header className="ml-1 space-y-2">
        <h1 className="text-xl font-medium md:text-2xl">Aluno Connect</h1>
        <h2 className="text-default-foreground">Informe uma senha segura</h2>
      </header>
      <p className="min-h-12 cursor-default rounded-lg border p-3">{email}</p>
      <input type="hidden" name="email" value={String(email)} />
      <Input
        name="password"
        type={`${visible ? 'text' : 'password'}`}
        placeholder="Senha"
        endContent={<LockKeyhole />}
        variant="faded"
        isInvalid={!!formState?.errors.password}
        errorMessage={formState?.errors.password}
      />
      <Input
        name="confirm"
        type={`${visible ? 'text' : 'password'}`}
        placeholder="Confirme a senha"
        endContent={<LockKeyhole />}
        variant="faded"
        isInvalid={!!formState?.errors.confirm}
        errorMessage={formState?.errors.confirm}
      />
      <button
        onClick={() => setVisible(!visible)}
        type="button"
        className="relative bottom-2 self-end"
      >
        {visible ? 'ocultar senha' : 'mostrar senha'}
      </button>
      {formState?.errors._form && (
        <DisplayErrorForm error={formState.errors._form} />
      )}
      <footer className="flex flex-col space-y-6">
        <FormSubmit title="Avançar" />
        <Link href="/entrar">
          <Button className="w-full">Cancelar</Button>
        </Link>
      </footer>
    </form>
  )
}
