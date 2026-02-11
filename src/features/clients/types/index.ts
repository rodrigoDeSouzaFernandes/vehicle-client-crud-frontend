export interface Client {
  id: string
  nome: string
  telefone: string
  cpf: string
  placaCarro: string
  createdAt: Date
}

export interface CreateClientDTO {
  nome: string
  telefone: string
  cpf: string
  placaCarro: string
}
