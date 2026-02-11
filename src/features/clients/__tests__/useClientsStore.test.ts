import { describe, it, expect, beforeEach } from 'vitest'
import { useClientsStore } from '../store/useClientsStore'

describe('useClientsStore (simples)', () => {
  beforeEach(() => {
    const store = useClientsStore.getState()
    store.setClients([])
    store.setError(null)
    store.setLoading(false)
  })

  it('inicializa vazio e permite set/get', () => {
    const store = useClientsStore.getState()
    expect(store.clients).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()

    const c1 = { id: '1', nome: 'B', telefone: '', cpf: '', placaCarro: '', createdAt: new Date() }
    const c2 = { id: '2', nome: 'A', telefone: '', cpf: '', placaCarro: '', createdAt: new Date() }

    store.addClient(c1 as any)
    store.addClient(c2 as any)

    expect(store.clients.map((c) => c.nome)).toEqual(['A', 'B'])

    expect(store.getClientById('1')?.id).toBe('1')

    store.removeClient('1')
    expect(store.clients.some((c) => c.id === '1')).toBe(false)

    store.setLoading(true)
    expect(store.isLoading).toBe(true)
    store.setLoading(false)

    store.setError('err')
    expect(store.error).toBe('err')
    store.setError(null)
  })
})
