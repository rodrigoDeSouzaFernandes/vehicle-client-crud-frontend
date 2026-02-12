import { Client } from '@/features/clients';
import { unmaskCPF, unmaskPhone, unmaskPlate } from './masks';

const isMatch = (client: Client, filter: string): boolean => {
  return [
    client.nome,
    client.cpf,
    client.telefone,
    client.placaCarro,
    unmaskCPF(client.cpf),
    unmaskPhone(client.telefone),
    unmaskPlate(client.placaCarro),
  ].some((value) => value.toLowerCase().includes(filter.toLowerCase()));
};

export const filterClients = (clients: Client[], filter: string): Client[] =>
  clients.filter((client) => isMatch(client, filter));
