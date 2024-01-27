import Link from 'next/link'

export default function AdministratorDashboardPage() {
  return (
    <section className="mt-5 flex flex-wrap space-x-3 rounded-lg bg-zinc-400 p-2 font-medium">
      <Link href="students">Alunos</Link>
      <Link href="parents">Responsáveis</Link>
      <Link href="instructors">Instrutores</Link>
      <Link href="classrooms">Turmas</Link>
      <Link href="requests">Solicitações</Link>
    </section>
  )
}
