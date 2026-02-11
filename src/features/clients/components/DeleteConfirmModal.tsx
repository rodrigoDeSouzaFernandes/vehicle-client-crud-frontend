import { useEffect, memo, useCallback } from 'react';
import type { Client } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  client: Client | null;
  isLoading: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

function DeleteConfirmModal({
  isOpen,
  client,
  isLoading,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps): JSX.Element | null {
  const handleConfirm = useCallback(async () => {
    await onConfirm();
  }, [onConfirm]);

  // Detectar ESC para fechar modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !client) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-title"
      aria-describedby="delete-confirm-desc"
    >
      <div
        className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="delete-confirm-title"
          className="text-lg font-bold mb-2 text-gray-900 dark:text-white"
        >
          Confirmar Exclusão
        </h2>

        <p id="delete-confirm-desc" className="text-gray-700 dark:text-gray-300 mb-6">
          Tem certeza que deseja deletar o cliente{' '}
          <span className="font-bold text-red-600 dark:text-red-400">{client.nome}</span>?
          <br />
          Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-3">
          <button
            autoFocus
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-950"
          >
            {isLoading ? 'Deletando...' : 'Deletar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(DeleteConfirmModal);
