import LogoutButton from '../common/logout-button'

export function NavbarAdministrator() {
  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-lg text-muted-foreground">Administrador</h1>
      <LogoutButton />
    </nav>
  )
}
