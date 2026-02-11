import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateClientModal } from '../components/CreateClientModal'

describe('CreateClientModal - Integração (simples)', () => {
  const mockOnClose = vi.fn()
  const mockOnSubmit = vi.fn(async () => Promise.resolve())

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza quando aberto e fecha com Cancelar', async () => {
    render(
      <CreateClientModal isOpen={true} isLoading={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const cancel = screen.getByRole('button', { name: /cancelar/i })
    await userEvent.click(cancel)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('foca no primeiro campo ao abrir', async () => {
    render(<CreateClientModal isOpen={true} isLoading={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />)
    await waitFor(() => expect(screen.getByPlaceholderText('João Silva')).toHaveFocus())
  })

  it('mascara telefone e CPF e envia dados válidos', async () => {
    render(<CreateClientModal isOpen={true} isLoading={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />)

    const nome = screen.getByPlaceholderText('João Silva')
    const telefone = screen.getByPlaceholderText('(11) 99999-8888')
    const cpf = screen.getByPlaceholderText('123.456.789-09')
    const placa = screen.getByPlaceholderText('ABC-1234')

    await userEvent.type(nome, 'João Silva')
    await userEvent.type(telefone, '11987654321')
    await userEvent.type(cpf, '11144477735')
    await userEvent.type(placa, 'abc1234')

    await waitFor(() => expect(telefone).toHaveValue('(11) 98765-4321'))
    await waitFor(() => expect(cpf).toHaveValue('111.444.777-35'))

    const submit = screen.getByRole('button', { name: /salvar/i })
    await waitFor(() => expect(submit).not.toBeDisabled())

    await userEvent.click(submit)
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled())
  })
})
