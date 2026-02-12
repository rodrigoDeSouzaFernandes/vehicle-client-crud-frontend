import { describe, it, expect } from 'vitest';
import { filterClients } from './filterClients';
import { Client } from '../../features/clients/types';

describe('filterClients', () => {
  const clients: Client[] = [
    {
      id: '1',
      nome: 'Rodrigo',
      cpf: '123.456.789-00',
      telefone: '(31) 99999-9999',
      placaCarro: 'ABC-1234',
      createdAt: new Date(),
    },
    {
      id: '2',
      nome: 'Maria',
      cpf: '987.654.321-00',
      telefone: '(11) 88888-8888',
      placaCarro: 'XYZ-9999',
      createdAt: new Date(),
    },
  ];

  it('should filter by name', () => {
    const result = filterClients(clients, 'rodrigo');
    expect(result).toHaveLength(1);
    expect(result[0].nome).toBe('Rodrigo');
  });

  it('should filter by masked CPF', () => {
    const result = filterClients(clients, '123.456');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter by unmasked CPF', () => {
    const result = filterClients(clients, '12345678900');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter by phone', () => {
    const result = filterClients(clients, '99999');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter by plate', () => {
    const result = filterClients(clients, 'xyz');
    expect(result).toHaveLength(1);
    expect(result[0].placaCarro).toBe('XYZ-9999');
  });

  it('should return empty array when no match is found', () => {
    const result = filterClients(clients, 'not-found');
    expect(result).toHaveLength(0);
  });
});
