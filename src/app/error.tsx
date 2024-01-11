'use client'

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <b className="text-lg text-muted-foreground">
        Não foi possível estabelecer uma conexão segura com o sevidor
      </b>
      <p className="text-muted-foreground">
        Verifique sua conexão com a internet e tente novamente
      </p>
    </div>
  )
}
