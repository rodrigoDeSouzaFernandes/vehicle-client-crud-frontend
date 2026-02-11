import { ReactNode, useState, useEffect, useCallback, useMemo } from 'react'
import type { Theme } from './ThemeContext'
import { ThemeContext } from './ThemeContext'
import { THEME_STORAGE_KEY } from '../constants'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(() => {
    
    // Tenta recuperar do localStorage
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (stored) return stored

    // Verifica preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  // Sincroniza com localStorage e DOM
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)

    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback((): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
