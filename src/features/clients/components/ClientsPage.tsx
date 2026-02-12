import { useCallback, useState } from 'react';
import { useClients } from '../hooks';
import { useToast } from '@/core/providers';
import ClientsTable from './ClientsTable';
import { CreateClientModal } from './CreateClientModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import type { Client } from '../types';
import type { CreateClientFormInput } from '../schemas';
import { SearchIcon } from 'lucide-react';

export function ClientsPage(): JSX.Element {
  const { clients, isLoading, handleCreateClient, handleUpdateClient, handleDeleteClient } =
    useClients();
  const { addToast } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [filter, setFilter] = useState<string>('');

  const handleCreateSubmit = useCallback(
    async (data: CreateClientFormInput) => {
      try {
        if (clientToEdit) {
          await handleUpdateClient(clientToEdit.id, data);
          addToast('Cliente atualizado com sucesso!', 'success');
          setClientToEdit(null);
        } else {
          await handleCreateClient(data);
          addToast('Cliente criado com sucesso!', 'success');
          setIsCreateModalOpen(false);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao processar cliente';
        addToast(message, 'error');
      }
    },
    [clientToEdit, handleCreateClient, handleUpdateClient, addToast]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!clientToDelete) return;

    setIsDeleteLoading(true);
    try {
      await handleDeleteClient(clientToDelete.id);
      addToast('Cliente deletado com sucesso!', 'success');
      setClientToDelete(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar cliente';
      addToast(message, 'error');
    } finally {
      setIsDeleteLoading(false);
    }
  }, [clientToDelete, handleDeleteClient, addToast]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h1>
        <label className="flex items-center ml-auto justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <SearchIcon size={16} />
          <input
            type="text"
            className="bg-transparent border-none  p-0 pl-1 ml-2 focus:outline-none focus:ring-0"
            placeholder="Buscar"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          />
        </label>

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
          setClientToEdit(client);
          setIsCreateModalOpen(true);
        }}
        onDelete={(client) => setClientToDelete(client)}
        filter={filter}
      />

      <CreateClientModal
        isOpen={isCreateModalOpen}
        isLoading={isLoading}
        onClose={() => {
          setIsCreateModalOpen(false);
          setClientToEdit(null);
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
  );
}
