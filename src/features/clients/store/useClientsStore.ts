import { create } from 'zustand'
import type { Client } from '../types'

interface ClientsStore {
  clients: Client[]
  isLoading: boolean
  error: string | null
  addClient: (client: Client) => void
  updateClient: (id: string, patch: Partial<Client>) => void
  removeClient: (id: string) => void
  setClients: (clients: Client[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  getClientById: (id: string) => Client | undefined
}

export const useClientsStore = create<ClientsStore>((set, get) => ({
  clients: [],
  isLoading: false,
  error: null,

  addClient: (client: Client) =>
    set((state) => ({
      clients: [...state.clients, client].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      ),
    })),

  updateClient: (id: string, patch: Partial<Client>) =>
    set((state) => ({
      clients: state.clients
        .map((c) => (c.id === id ? { ...c, ...patch } : c))
        .sort((a, b) => a.nome.localeCompare(b.nome)),
    })),

  removeClient: (id: string) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),

  setClients: (clients: Client[]) =>
    set({
      clients: [...clients].sort((a, b) => a.nome.localeCompare(b.nome)),
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  getClientById: (id: string) => {
    const state = get()
    return state.clients.find((client) => client.id === id)
  },
}))
