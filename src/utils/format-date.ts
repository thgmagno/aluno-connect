export const FormatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('pt-br')
}
