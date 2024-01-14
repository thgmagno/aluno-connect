import { z } from 'zod'

export const createInstructorOrParentSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'Ultrapassou limite de 40 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
})

export const createStudentSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'Ultrapassou limite de 40 caracteres'),
  email: z.string().email('O e-mail é inválido'),
  birthdate: z.string().min(1, 'A data de nascimento é obrigatória'),
})

export const createClassSchema = z.object({
  course_name: z
    .string()
    .min(1, 'O nome do curso é obrigatório')
    .max(60, 'Ultrapassou limite de 60 caracteres'),
})

export const loginUserSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

export const validateEmailSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
})

const ProfileEnum = z.enum(['student', 'instructor', 'administrator', 'parent'])

export const registerUserPasswordSchema = z
  .object({
    id: z.string(),
    email: z.string().email('Formato de e-mail inválido'),
    profile: ProfileEnum,
    password: z.string().min(4, 'A senha precisa ter pelo menos 4 caracteres'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  })

export type UserType = 'instructor' | 'student' | 'parent' | 'administrator'
