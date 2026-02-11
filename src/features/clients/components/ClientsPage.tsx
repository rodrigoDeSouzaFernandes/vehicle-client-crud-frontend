import { useCallback, useState, useEffect } from 'react'
import { useClients } from '../hooks'
import { useToast } from '@/core/providers'
import ClientsTable from './ClientsTable'
import { CreateClientModal } from './CreateClientModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import type { Client } from '../types'
import type { CreateClientFormInput } from '../schemas'

export function ClientsPage(): JSX.Element {
  const {
    clients,
    isLoading,
    error,
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
  } = useClients()
  const { addToast } = useToast()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  // Exibe toast de erro quando erro muda (evita toasts duplicados)
  useEffect(() => {
    if (error) {
      addToast(error, 'error')
    }
  }, [error, addToast])

  const handleCreateSubmit = useCallback(
    async (data: CreateClientFormInput) => {
      try {
        if (clientToEdit) {
          await handleUpdateClient(clientToEdit.id, data)
          addToast('Cliente atualizado com sucesso!', 'success')
          setClientToEdit(null)
        } else {
          await handleCreateClient(data)
          addToast('Cliente criado com sucesso!', 'success')
          setIsCreateModalOpen(false)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao criar cliente'
        addToast(message, 'error')
      }
    },
    [clientToEdit, handleCreateClient, handleUpdateClient, addToast]
  )

  const handleDeleteConfirm = useCallback(async () => {
    if (!clientToDelete) return

    setIsDeleteLoading(true)
    try {
      await handleDeleteClient(clientToDelete.id)
      addToast('Cliente deletado com sucesso!', 'success')
      setClientToDelete(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar cliente'
      addToast(message, 'error')
    } finally {
      setIsDeleteLoading(false)
    }
  }, [clientToDelete, handleDeleteClient, addToast])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Clientes
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-950 disabled:opacity-50"
          disabled={isLoading}
          aria-label="Criar novo cliente"
        >
          + Novo Cliente
        </button>
      </div>

      <ClientsTable
        clients={clients}
        isLoading={isLoading}
        onEdit={(client) => {
          setClientToEdit(client)
          setIsCreateModalOpen(true)
        }}
        onDelete={(client) => setClientToDelete(client)}
      />

      <CreateClientModal
        isOpen={isCreateModalOpen}
        isLoading={isLoading}
        onClose={() => {
          setIsCreateModalOpen(false)
          setClientToEdit(null)
        }}
        onSubmit={handleCreateSubmit}
        initialValues={clientToEdit ?? undefined}
      />

      <DeleteConfirmModal
        isOpen={clientToDelete !== null}
        client={clientToDelete}
        isLoading={isDeleteLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setClientToDelete(null)}
      />
    </div>
  )
}
