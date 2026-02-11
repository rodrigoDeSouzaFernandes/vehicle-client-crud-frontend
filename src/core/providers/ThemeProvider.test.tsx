import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './ThemeContext'

function TestComponent(): JSX.Element {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Trocar tema</button>
    </div>
  )
}

describe('ThemeContext and ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('deve inicia com tema light por padrão', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText('Tema atual: light')).toBeInTheDocument()
  })

  it('deve fazer toggle entre temas', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText('Tema atual: light')).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /trocar tema/i })
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Tema atual: dark')).toBeInTheDocument()
    })
  })

  it('deve persistir tema no localStorage', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const button = screen.getByRole('button', { name: /trocar tema/i })
    await user.click(button)

    await waitFor(() => {
      expect(localStorage.getItem('@app:theme')).toBe('dark')
    })
  })

  it('deve restaurar tema do localStorage', () => {
    localStorage.setItem('@app:theme', 'dark')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText('Tema atual: dark')).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('deve adicionar class "dark" ao html ao trocar para dark', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    const button = screen.getByRole('button', { name: /trocar tema/i })
    await user.click(button)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('deve remover class "dark" ao voltar para light', async () => {
    localStorage.setItem('@app:theme', 'dark')

    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    const button = screen.getByRole('button', { name: /trocar tema/i })
    await user.click(button)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })
})
