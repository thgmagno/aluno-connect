export function CheckAgeStudent(birthdate: Date | null | undefined) {
  if (!birthdate) return false
  const currentDate = new Date()
  let idade = currentDate.getFullYear() - birthdate.getFullYear()
  const mes = currentDate.getMonth() - birthdate.getMonth()

  if (mes < 0 || (mes === 0 && currentDate.getDate() < birthdate.getDate())) {
    idade--
  }

  return idade >= 18
}
