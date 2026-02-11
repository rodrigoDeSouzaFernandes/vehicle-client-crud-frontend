import { useCallback, useEffect } from 'react'
import { useClientsStore } from '../store'
import {
  fetchAllClients,
  createClientAPI,
  deleteClientAPI,
  updateClientAPI,
} from '../services'
import type { CreateClientDTO } from '../types'

export function useClients() {
  const clients = useClientsStore((s) => s.clients)
  const isLoading = useClientsStore((s) => s.isLoading)
  const error = useClientsStore((s) => s.error)

  const setLoading = useClientsStore((s) => s.setLoading)
  const setError = useClientsStore((s) => s.setError)
  const setClients = useClientsStore((s) => s.setClients)
  const addClient = useClientsStore((s) => s.addClient)
  const removeClient = useClientsStore((s) => s.removeClient)
  const updateClient = useClientsStore((s) => s.updateClient)

  const loadClients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetched = await fetchAllClients()
      setClients(fetched)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setClients])

  const handleCreateClient = useCallback(
    async (data: CreateClientDTO) => {
      setLoading(true)
      setError(null)
      try {
        const newClient = await createClientAPI(data)
        addClient(newClient)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao criar cliente'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, addClient]
  )

  const handleDeleteClient = useCallback(
    async (id: string) => {
      setLoading(true)
      setError(null)
      try {
        await deleteClientAPI(id)
        removeClient(id)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao deletar cliente'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setError, removeClient]
  )

    const handleUpdateClient = useCallback(
      async (id: string, data: CreateClientDTO) => {
        setLoading(true)
        setError(null)
        try {
          const updated = await updateClientAPI(id, data)
          updateClient(id, updated)
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Erro ao atualizar cliente'
          setError(message)
          throw err
        } finally {
          setLoading(false)
        }
      },
      [setLoading, setError, updateClient]
    )

  useEffect(() => {
    loadClients()
  }, [loadClients])

  return {
    clients,
    isLoading,
    error,
    loadClients,
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
  }
}
