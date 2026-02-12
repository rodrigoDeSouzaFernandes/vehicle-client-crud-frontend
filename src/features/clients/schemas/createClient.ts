import { validateCPF } from '@/shared/utils/validateCpf'
import { z } from 'zod'

const phoneRegex = /^(?:\(\d{2}\)\s?)?\d{4,5}-\d{4}$/
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
const plateRegex = /^[A-Z]{3}-\d{4}$/

export const createClientSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome não pode ter mais de 100 caracteres' }),
  telefone: z
    .string()
    .min(1, { message: 'Telefone é obrigatório' })
    .refine(
      (value) => phoneRegex.test(value) || value === '',
      'Telefone inválido. Use o formato (XX) XXXXX-XXXX'
    ),
  cpf: z
    .string()
    .min(1, { message: 'CPF é obrigatório' })
    .refine(
      (value) => cpfRegex.test(value) || value === '',
      'CPF inválido. Use o formato XXX.XXX.XXX-XX'
    )
    .refine((value) => validateCPF(value), 'CPF inválido'),
  placaCarro: z
    .string()
    .min(1, { message: 'Placa do carro é obrigatória' })
    .refine(
      (value) => plateRegex.test(value) || value === '',
      'Placa inválida. Use o formato XXX-XXXX'
    ),
})

export type CreateClientFormInput = z.infer<typeof createClientSchema>

