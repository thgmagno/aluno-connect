import LogoutButton from '../common/logout-button'

export function NavbarStudent({ name }: { name: string }) {
  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-muted-foreground">Bem-vindo, {name}</h1>
      <LogoutButton />
    </nav>
  )
}
