import { z } from 'zod'

export const createStudentSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('O e-mail é inválido'),
  birthdate: z.string().min(1, 'A data de nascimento é obrigatória'),
})
