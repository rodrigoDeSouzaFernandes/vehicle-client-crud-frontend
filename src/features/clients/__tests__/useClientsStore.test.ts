import { describe, it, expect, beforeEach } from 'vitest';
import { useClientsStore } from '../store/useClientsStore';
import type { Client } from '../types';

describe('useClientsStore', () => {
  let store: ReturnType<typeof useClientsStore.getState>;

  beforeEach(() => {
    // Reset da store
    useClientsStore.setState({
      clients: [],
      isLoading: false,
      error: null,
    });
    store = useClientsStore.getState();
  });

  it('should initialize with empty state', () => {
    store = useClientsStore.getState();
    expect(store.clients).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('should add clients and maintain alphabetical order', () => {
    const c1: Client = {
      id: '1',
      nome: 'B',
      telefone: '',
      cpf: '',
      placaCarro: '',
      createdAt: new Date(),
    };
    const c2: Client = {
      id: '2',
      nome: 'A',
      telefone: '',
      cpf: '',
      placaCarro: '',
      createdAt: new Date(),
    };

    useClientsStore.getState().addClient(c1);
    useClientsStore.getState().addClient(c2);

    store = useClientsStore.getState();

    expect(store.clients.map((c) => c.nome)).toEqual(['A', 'B']);
    expect(store.getClientById('1')?.id).toBe('1');
  });

  it('should remove a client correctly', () => {
    const client: Client = {
      id: '1',
      nome: 'B',
      telefone: '',
      cpf: '',
      placaCarro: '',
      createdAt: new Date(),
    };
    useClientsStore.getState().addClient(client);

    store = useClientsStore.getState();
    expect(store.clients.length).toBe(1);

    useClientsStore.getState().removeClient('1');
    store = useClientsStore.getState();
    expect(store.clients.length).toBe(0);
    expect(store.getClientById('1')).toBeUndefined();
  });

  it('should set loading and error states correctly', () => {
    useClientsStore.getState().setLoading(true);
    store = useClientsStore.getState();
    expect(store.isLoading).toBe(true);

    useClientsStore.getState().setLoading(false);
    store = useClientsStore.getState();
    expect(store.isLoading).toBe(false);

    useClientsStore.getState().setError('Erro');
    store = useClientsStore.getState();
    expect(store.error).toBe('Erro');

    useClientsStore.getState().setError(null);
    store = useClientsStore.getState();
    expect(store.error).toBeNull();
  });
});
