import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useClients } from '../hooks/useClients'
import * as api from '../services'

describe('useClients hook (mocked)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('carrega clientes e faz CRUD básico', async () => {
    const fake = [
      { id: '1', nome: 'A', telefone: '', cpf: '', placaCarro: '', createdAt: new Date() },
      { id: '2', nome: 'B', telefone: '', cpf: '', placaCarro: '', createdAt: new Date() },
    ]

    vi.spyOn(api, 'fetchAllClients').mockResolvedValueOnce(fake)
    vi.spyOn(api, 'createClientAPI').mockImplementation(async (data) => ({ id: '3', ...data, createdAt: new Date() }))
    vi.spyOn(api, 'deleteClientAPI').mockResolvedValue(undefined)

    const { result } = renderHook(() => useClients())

    await waitFor(() => result.current.clients.length === 2)
    expect(result.current.clients.map((c) => c.nome)).toEqual(['A', 'B'])

    await act(async () => {
      await result.current.handleCreateClient({ nome: 'C', telefone: '', cpf: '', placaCarro: '' })
    })
    expect(result.current.clients.some((c) => c.nome === 'C')).toBe(true)

    await act(async () => {
      await result.current.handleDeleteClient('3')
    })
    expect(result.current.clients.some((c) => c.id === '3')).toBe(false)
  })
})
