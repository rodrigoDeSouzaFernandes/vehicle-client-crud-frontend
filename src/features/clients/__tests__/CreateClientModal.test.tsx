import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateClientModal } from '../components/CreateClientModal';

describe('CreateClientModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn(async () => Promise.resolve());

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when open and closes on Cancel', async () => {
    const user = userEvent.setup();

    render(
      <CreateClientModal
        isOpen={true}
        isLoading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });

    await user.click(cancelButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });

  it('focuses on the first field when opened', async () => {
    render(
      <CreateClientModal
        isOpen={true}
        isLoading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    await waitFor(() => expect(screen.getByPlaceholderText('João Silva')).toHaveFocus());
  });

  it('masks phone and CPF and submits valid data', async () => {
    const user = userEvent.setup();

    render(
      <CreateClientModal
        isOpen={true}
        isLoading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const nomeInput = screen.getByTestId('input-nome') as HTMLInputElement;
    const telefoneInput = screen.getByTestId('input-telefone') as HTMLInputElement;
    const cpfInput = screen.getByTestId('input-cpf') as HTMLInputElement;
    const placaInput = screen.getByTestId('input-placa') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /salvar/i }) as HTMLButtonElement;

    await user.type(nomeInput, 'João Silva');
    await user.type(telefoneInput, '11987654321');
    await user.type(cpfInput, '23102031064');
    await user.type(placaInput, 'abc1234');

    await waitFor(() => expect(submitButton).not.toBeDisabled());

    expect(telefoneInput.value).toBe('(11) 98765-4321');
    expect(cpfInput.value).toBe('231.020.310-64');
    expect(placaInput.value).toBe('ABC-1234');

    await user.click(submitButton);

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        nome: 'João Silva',
        telefone: '(11) 98765-4321',
        cpf: '231.020.310-64',
        placaCarro: 'ABC-1234',
      })
    );
  });
});
