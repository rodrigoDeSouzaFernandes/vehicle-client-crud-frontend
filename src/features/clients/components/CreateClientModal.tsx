import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSchema, type CreateClientFormInput } from '../schemas';
import { maskPhone, maskCPF, maskPlate } from '@/shared/utils';
import type { Client } from '../types';

interface CreateClientModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientFormInput) => Promise<void>;
  initialValues?: Client | undefined;
}

export function CreateClientModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  initialValues,
}: CreateClientModalProps): JSX.Element | null {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setFocus,
    setValue,
  } = useForm<CreateClientFormInput>({
    resolver: zodResolver(createClientSchema),
    mode: 'onChange',
  });

  // Redefine o formulário e auto-foca no primeiro input quando modal abre ou valores iniciais mudam
  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }

    if (initialValues) {
      reset({
        nome: initialValues.nome,
        telefone: initialValues.telefone,
        cpf: initialValues.cpf,
        placaCarro: initialValues.placaCarro,
      });
    }

    // Foca no primeiro input usando API do react-hook-form
    setFocus('nome');
  }, [isOpen, initialValues, reset, setFocus]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch {
      // Erro já é tratado no store
    }
  });

  // Detectar ESC para fechar modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-client-title"
    >
      <div
        className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="create-client-title"
          className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Novo Cliente
        </h2>

        <form onSubmit={onSubmitForm} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nome{' '}
              <span className="text-red-500" aria-label="obrigatório">
                *
              </span>
            </label>
            <input
              id="nome"
              type="text"
              {...register('nome')}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? 'nome-error' : undefined}
              placeholder="João Silva"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || isLoading}
            />
            {errors.nome && (
              <p id="nome-error" className="text-red-500 text-sm mt-1 font-medium">
                {errors.nome.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Telefone{' '}
              <span className="text-red-500" aria-label="obrigatório">
                *
              </span>
            </label>
            <input
              id="telefone"
              type="tel"
              {...register('telefone', {
                onChange: (e) => {
                  const masked = maskPhone(e.target.value);
                  setValue('telefone', masked, { shouldValidate: false, shouldDirty: true });
                },
              })}
              aria-invalid={!!errors.telefone}
              aria-describedby={errors.telefone ? 'telefone-error' : undefined}
              placeholder="(11) 99999-8888"
              maxLength={15}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || isLoading}
            />
            {errors.telefone && (
              <p id="telefone-error" className="text-red-500 text-sm mt-1 font-medium">
                {errors.telefone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              CPF{' '}
              <span className="text-red-500" aria-label="obrigatório">
                *
              </span>
            </label>
            <input
              id="cpf"
              type="text"
              {...register('cpf', {
                onChange: (e) => {
                  const masked = maskCPF(e.target.value);
                  setValue('cpf', masked, { shouldValidate: false, shouldDirty: true });
                },
              })}
              aria-invalid={!!errors.cpf}
              aria-describedby={errors.cpf ? 'cpf-error' : undefined}
              placeholder="123.456.789-09"
              maxLength={14}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || isLoading}
            />
            {errors.cpf && (
              <p id="cpf-error" className="text-red-500 text-sm mt-1 font-medium">
                {errors.cpf.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="placaCarro"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Placa do Carro{' '}
              <span className="text-red-500" aria-label="obrigatório">
                *
              </span>
            </label>
            <input
              id="placaCarro"
              type="text"
              {...register('placaCarro', {
                onChange: (e) => {
                  const masked = maskPlate(e.target.value);
                  setValue('placaCarro', masked, { shouldValidate: false, shouldDirty: true });
                },
              })}
              aria-invalid={!!errors.placaCarro}
              aria-describedby={errors.placaCarro ? 'placaCarro-error' : undefined}
              placeholder="ABC-1234"
              maxLength={8}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              disabled={isSubmitting || isLoading}
            />
            {errors.placaCarro && (
              <p id="placaCarro-error" className="text-red-500 text-sm mt-1 font-medium">
                {errors.placaCarro.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950 disabled:opacity-50"
              disabled={isSubmitting || isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting || isLoading}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-disabled disabled:cursor-not-allowed text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950"
            >
              {isLoading || isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
