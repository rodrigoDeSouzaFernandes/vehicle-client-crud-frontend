import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './ThemeContext';

function TestComponent(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

describe('ThemeContext and ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should start with light theme by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });

  it('should toggle between light and dark themes', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    });

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    });
  });

  it('should persist theme in localStorage', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });

    await user.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('@app:theme')).toBe('dark');
    });
  });

  it('should restore theme from localStorage', () => {
    localStorage.setItem('@app:theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should add "dark" class to html when switched to dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('should remove "dark" class when switched back to light', async () => {
    localStorage.setItem('@app:theme', 'dark');
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
