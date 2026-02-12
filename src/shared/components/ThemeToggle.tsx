import { useTheme } from '@/core/providers';
import { Moon, MoonIcon, MoonStar, Sun } from 'lucide-react';

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950"
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Tema atual: ${theme === 'light' ? 'Claro' : 'Escuro'}`}
    >
      {theme === 'light' ? (
        <span className="text-xl">
          <MoonStar size={16} />
        </span>
      ) : (
        <span className="text-xl">
          <Sun size={16} />
        </span>
      )}
    </button>
  );
}
