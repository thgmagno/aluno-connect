import { z } from 'zod'

export const instructorRegistrationSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z
    .string()
    .min(4, 'A senha precisa ter pelo menos 4 caracteres')
    .optional(),
})

export const studentRegistrationSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  birthdate: z.date(),
})

export const parentRegistrationSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(4, 'A senha precisa ter pelo menos 4 caracteres'),
})

export const loginUserSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

export const validateEmailSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
})

export type UserType = 'instructor' | 'student' | 'parent' | 'administrator'
