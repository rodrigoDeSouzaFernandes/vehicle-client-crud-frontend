import { memo, useMemo, useState } from 'react';
import type { Client } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ClientsTableProps {
  clients: Client[];
  isLoading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

function ClientsTable({ clients, isLoading, onEdit, onDelete }: ClientsTableProps): JSX.Element {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedClients = useMemo(() => {
    const sorted = [...clients];
    sorted.sort((a, b) => {
      const comparison = a.nome.localeCompare(b.nome);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [clients, sortOrder]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum cliente cadastrado</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          Clique em "Novo Cliente" para começar
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded px-1"
                aria-label={`Ordenar por nome (${sortOrder === 'asc' ? 'descendente' : 'ascendente'})`}
              >
                Nome {sortOrder === 'asc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              </button>
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
              Telefone
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
              CPF
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
              Placa
            </th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr
              key={client.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
            >
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{client.nome}</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{client.telefone}</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{client.cpf}</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-mono">
                {client.placaCarro}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(client)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950"
                    aria-label={`Editar cliente ${client.nome}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(client)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-950"
                    aria-label={`Deletar cliente ${client.nome}`}
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(ClientsTable);
