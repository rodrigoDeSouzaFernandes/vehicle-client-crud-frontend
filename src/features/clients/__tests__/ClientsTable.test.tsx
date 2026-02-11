import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClientsTable from '../components/ClientsTable'
import { Client } from '../types'

describe('ClientsTable', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  const mockClients: Client[] = [
    {
      id: '1',
      nome: 'Ana Silva',
      telefone: '(11) 98765-4321',
      cpf: '111.444.777-35',
      placaCarro: 'ABC-1234',
      createdAt: new Date(),
    },
    {
      id: '2',
      nome: 'Zara Costa',
      telefone: '(21) 99876-5432',
      cpf: '222.555.888-46',
      placaCarro: 'XYZ-9876',
      createdAt: new Date(),
    },
  ]

  it('deve renderizar tabela com clientes', () => {
    render(
      <ClientsTable
        clients={mockClients}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Ana Silva')).toBeInTheDocument()
    expect(screen.getByText('Zara Costa')).toBeInTheDocument()
  })

  it('deve renderizar skeleton durante loading', () => {
    const { container } = render(
      <ClientsTable
        clients={[]}
        isLoading={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('deve mostrar empty state quando não há clientes', () => {
    render(
      <ClientsTable
        clients={[]}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Nenhum cliente cadastrado')).toBeInTheDocument()
  })

  it('deve ordenar clientes alfabeticamente', async () => {
    render(
      <ClientsTable
        clients={mockClients}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Ana Silva')
    expect(rows[2]).toHaveTextContent('Zara Costa')
  })

  it('deve chamar onDelete ao clicar em botão deletar', async () => {
    const user = userEvent.setup()
    render(
      <ClientsTable
        clients={mockClients}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButtons = screen.getAllByRole('button', { name: /deletar/i })
    await user.click(deleteButtons[0])

    expect(mockOnDelete).toHaveBeenCalledWith(mockClients[0])
  })

  it('deve chamar onEdit ao clicar em botão editar', async () => {
    const user = userEvent.setup()
    render(
      <ClientsTable
        clients={mockClients}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButtons = screen.getAllByRole('button', { name: /editar/i })
    await user.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledWith(mockClients[0])
  })

  it('deve exibir informações dos clientes corretamente', () => {
    render(
      <ClientsTable
        clients={mockClients}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    mockClients.forEach((client) => {
      expect(screen.getByText(client.nome)).toBeInTheDocument()
      expect(screen.getByText(client.telefone)).toBeInTheDocument()
      expect(screen.getByText(client.cpf)).toBeInTheDocument()
      expect(screen.getByText(client.placaCarro)).toBeInTheDocument()
    })
  })
})
