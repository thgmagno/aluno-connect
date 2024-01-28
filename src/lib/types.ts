import { z } from 'zod'

export const instructorSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'Ultrapassou limite de 40 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
})

export const parentSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'Ultrapassou limite de 40 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
})

export const studentSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'Ultrapassou limite de 40 caracteres'),
  email: z.string().email('O e-mail é inválido'),
  birthdate: z.string().min(1, 'A data de nascimento é obrigatória'),
})

export const classSchema = z.object({
  id: z.string().optional(),
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

export const requestSchema = z.object({
  frequencyId: z.string().min(25),
  studentId: z.string(),
  courseName: z.string(),
  studentName: z.string(),
  frequencyDate: z.string(),
  justification: z.string().min(1, 'O campo justificativa é obrigatório'),
  // media: z
  //   .any()
  //   .optional()
  //   .refine(
  //     (file) => file?.size <= 5 * 1024 * 1024,
  //     `Tamanho máximo de arquivo é 5MB`,
  //   ),
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
export type CategoryType = 'instructor' | 'student' | 'parent' | 'classroom'
export type EntityType =
  | 'instructor'
  | 'student'
  | 'parent'
  | 'classroom'
  | 'frequency'
  | 'request'

export interface RenderRequestsProps {
  data: {
    id: string
    studentId: string
    date: Date
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    justification: string
    imageURL: string | null
    studentID: {
      id: string
      name: string
      email: string
      password: string | null
      birthdate: Date
      firstAccess: boolean
    }
  }[]
}
