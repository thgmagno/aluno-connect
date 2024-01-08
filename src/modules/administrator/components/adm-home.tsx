import AdmNavbar from './adm-navbar'

export default function AdmHome({
  id,
  name,
  profile,
}: {
  id: string
  name: string
  profile: string
}) {
  return (
    <>
      <AdmNavbar name={name} profile={profile} />
    </>
  )
}
