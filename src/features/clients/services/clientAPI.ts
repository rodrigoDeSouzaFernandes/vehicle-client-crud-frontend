import { v4 as uuidv4 } from 'uuid';
import type { Client, CreateClientDTO } from '../types';

// Simular um "banco de dados" em memória
let mockDatabase: Client[] = [
  {
    id: uuidv4(),
    nome: 'João Silva',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-09',
    placaCarro: 'ABC-1234',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: uuidv4(),
    nome: 'Maria Santos',
    telefone: '(21) 99876-5432',
    cpf: '234.567.890-10',
    placaCarro: 'XYZ-9876',
    createdAt: new Date('2024-01-20'),
  },
];

export async function fetchAllClients(): Promise<Client[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDatabase].sort((a, b) => a.nome.localeCompare(b.nome)));
    }, 500);
  });
}

export async function fetchClientById(id: string): Promise<Client | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const client = mockDatabase.find((c) => c.id === id);
      resolve(client || null);
    }, 300);
  });
}

export async function createClientAPI(data: CreateClientDTO): Promise<Client> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cpfExists = mockDatabase.some((c) => c.cpf === data.cpf);
      if (cpfExists) {
        reject(new Error('CPF já cadastrado no sistema'));
        return;
      }

      const newClient: Client = {
        id: uuidv4(),
        ...data,
        createdAt: new Date(),
      };

      mockDatabase.push(newClient);
      resolve(newClient);
    }, 800);
  });
}

export async function updateClientAPI(id: string, data: CreateClientDTO): Promise<Client> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idx = mockDatabase.findIndex((c) => c.id === id);
      if (idx === -1) {
        reject(new Error('Cliente não encontrado'));
        return;
      }

      const cpfExists = mockDatabase.some((c) => c.cpf === data.cpf && c.id !== id);
      if (cpfExists) {
        reject(new Error('CPF já cadastrado no sistema'));
        return;
      }

      const updated: Client = {
        ...mockDatabase[idx],
        ...data,
      };

      mockDatabase[idx] = updated;
      resolve(updated);
    }, 500);
  });
}

export async function deleteClientAPI(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDatabase = mockDatabase.filter((c) => c.id !== id);
      resolve();
    }, 400);
  });
}

// Reseta o banco de dados (útil para testes)
export function resetMockDatabase(): void {
  mockDatabase = [
    {
      id: uuidv4(),
      nome: 'João Silva',
      telefone: '(11) 98765-4321',
      cpf: '123.456.789-09',
      placaCarro: 'ABC-1234',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: uuidv4(),
      nome: 'Maria Santos',
      telefone: '(21) 99876-5432',
      cpf: '234.567.890-10',
      placaCarro: 'XYZ-9876',
      createdAt: new Date('2024-01-20'),
    },
  ];
}
