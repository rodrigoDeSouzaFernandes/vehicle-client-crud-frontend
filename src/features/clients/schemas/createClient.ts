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

function validateCPF(cpf: string): boolean {
  if (!cpf) return false

  const cleanCPF = cpf.replace(/[.-]/g, '')

  if (cleanCPF.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false

  if (cleanCPF === '12345678909') return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
  }
  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
  }
  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder

  return (
    digit1 === parseInt(cleanCPF.charAt(9)) &&
    digit2 === parseInt(cleanCPF.charAt(10))
  )
}
