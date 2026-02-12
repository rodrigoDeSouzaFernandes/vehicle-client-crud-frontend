import { describe, it, expect } from 'vitest'
import { createClientSchema } from '../schemas/createClient'

describe('createClientSchema', () => {
  it('accept valid data', () => {
    const data = { nome: 'João', telefone: '(11) 99999-8888', cpf: '111.444.777-35', placaCarro: 'ABC-1234' }
    const res = createClientSchema.safeParse(data)
    expect(res.success).toBe(true)
  })

  it('reject invalids CPFs', () => {
    const bad = ['000.000.000-00', '123.456.789-09', '111.111.111-11']
    bad.forEach((cpf) => {
      const res = createClientSchema.safeParse({ nome: 'X', telefone: '(11) 99999-8888', cpf, placaCarro: 'ABC-1234' })
      expect(res.success).toBe(false)
    })
  })

  it('reject invalid phone number', () => {
    const bad = ['123', '(11) 1234', 'abcd']
    bad.forEach((telefone) => {
      const res = createClientSchema.safeParse({ nome: 'X', telefone, cpf: '111.444.777-35', placaCarro: 'ABC-1234' })
      expect(res.success).toBe(false)
    })
  })
})
