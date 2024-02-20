import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('O e-mail é inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

export const ActivateEmailSchema = z.object({
  email: z.string().email('O e-mail é inválido'),
})

export const SetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres')
      .max(40, 'A senha ultrapassa o limite de 40 caracteres'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  })

export const StudentSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'O nome ultrapassa o limite de 40 caracteres'),
  email: z.string().email('O e-mail é inválido'),
  birthdate: z.string().min(1, 'A data de nascimento é obrigatória'),
})

export const ParentSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'O nome ultrapassa o limite de 40 caracteres'),
  email: z.string().email('O e-mail é inválido'),
})

export const InstructorSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(40, 'O nome ultrapassa o limite de 40 caracteres'),
  email: z.string().email('O e-mail é inválido'),
})

export const ClassroomSchema = z.object({
  id: z.string().optional(),
  course_name: z
    .string()
    .min(1, 'O nome da turma é obrigatório')
    .max(60, 'O nome da turma ultrapassa o limite de 60 caracteres'),
})

export const RequestSchema = z.object({
  frequency_id: z.string().min(1),
  student_id: z.string().min(1),
  parent_id: z.string().optional(),
  student_name: z.string(),
  justification: z
    .string()
    .min(10, 'A justificativa precisa ter pelo menos 10 caracteres')
    .max(140, 'A justificativa ultrapassa o limite de 140 caracteres'),
  course_name: z.string(),
  classroom_id: z.string(),
  dateOfAbsense: z.string(),

  // TODO: Corrigir o tipo arquivo
  file: z.string().optional(),
})
