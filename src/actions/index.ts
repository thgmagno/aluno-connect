'use server'

export async function createStudent(
  formState: { message: string },
  formData: FormData,
) {
  const name = formData.get('name')
  const email = formData.get('email')
  const birthdate = formData.get('birthdate')

  if (typeof name !== 'string' || name.length < 1) {
    return { message: 'O nome é obrigatório' }
  }

  if (typeof email !== 'string' || email.length < 1) {
    return { message: 'O email é obrigatório' }
  }

  return {
    message: 'Criando cadastro de aluno...',
  }
}
