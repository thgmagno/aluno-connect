export default function Unauthorized() {
  return (
    <div className="my-5 flex flex-col items-center justify-center space-y-5 text-muted-foreground">
      <h1 className="font-semibold">Não autorizado</h1>
      <span>O usuário logado não tem permissão para acessar a página.</span>
    </div>
  )
}
