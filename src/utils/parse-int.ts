export const ParseInt = (value: string | null) => {
  const intValue = Number(value)
  if (!intValue || isNaN(intValue)) {
    console.log('Aqui: ', intValue)
    throw new Error('O ID precisa ser numérico')
  }
  return intValue
}
