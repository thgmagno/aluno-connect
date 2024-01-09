'use server'

export async function createStudent(
  formState: { message: string },
  formData: FormData,
) {
  // verificar se o usuário é ADM
  // const isAdm = função que retornar true/false
  // if (!isAdm) return { message: 'Não autorizado' }

  const name = formData.get('name')
  const email = formData.get('email')
  const birthdate = formData.get('birthdate')

  if (typeof name !== 'string' || name.length < 1) {
    return { message: 'O nome é obrigatório' }
  }

  if (typeof email !== 'string' || email.length < 1) {
    return { message: 'O email é obrigatório' }
  }

  if (!(birthdate instanceof Date) || !birthdate) {
    return { message: 'A data de nascimento é obrigatória' }
  }

  return {
    message: 'Criando cadastro de aluno...',
  }
}
